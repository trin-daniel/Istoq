import { SignUpController } from './signup-controller'
import { AccountModel, AddAccount, AddAccountParams, EmailValidator, HttpRequest } from './signup-controller-protocols'
import { badRequest, ok, serverError } from '../../helpers/http/http-helpers'
import { InvalidParamError, MissingParamError } from '../../errors'
import { internet, random } from 'faker'

type SutTypes = {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const passwordFreeze = internet.password()
const mockHttpRequest: HttpRequest = {
  body: {
    name: internet.userName(),
    email: internet.email(),
    password: passwordFreeze,
    confirmation: passwordFreeze
  }
}

const mockAccount = {
  id: random.uuid(),
  name: mockHttpRequest.body.name,
  email: mockHttpRequest.body.email,
  password: passwordFreeze,
  created_at: new Date(),
  updated_at: new Date()
}

const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isEmail (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (params: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccount)
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount()
  const emailValidatorStub = mockEmailValidator()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = { body: { ...mockHttpRequest.body, name: undefined } }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = { body: { ...mockHttpRequest.body, email: undefined } }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = { body: { ...mockHttpRequest.body, password: undefined } }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if no confirmation is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = { body: { ...mockHttpRequest.body, confirmation: undefined } }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('confirmation')))
  })

  test('Should return 400 if password confirmation fails', async () => {
    const { sut } = makeSut()
    const httpRequest = { body: { ...mockHttpRequest.body, confirmation: 'another_value' } }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('confirmation')))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isEmail').mockReturnValueOnce(false)
    const httpRequest = mockHttpRequest
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isEmailSpy = jest.spyOn(emailValidatorStub, 'isEmail')
    const httpRequest = mockHttpRequest
    await sut.handle(httpRequest)
    expect(isEmailSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isEmail').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = mockHttpRequest
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = mockHttpRequest
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const httpRequest = mockHttpRequest
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockHttpRequest
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(mockAccount))
  })
})
