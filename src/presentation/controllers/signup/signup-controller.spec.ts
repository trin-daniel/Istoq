import { SignUpController } from './signup-controller'
import { Account, AddAccount, AddAccountParams, HttpRequest, Validation } from './signup-controller-protocols'
import { badRequest, ok, serverError } from '../../helpers/http/http-helpers'
import { MissingParamError } from '../../errors'
import { internet, random } from 'faker'

type SutTypes = {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
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

const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (params: AddAccountParams): Promise<Account> {
      return Promise.resolve(mockAccount)
    }
  }
  return new AddAccountStub()
}

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addAccountStub = mockAddAccount()
  const sut = new SignUpController(addAccountStub, validationStub)
  return {
    sut,
    addAccountStub,
    validationStub
  }
}

describe('SignUp Controller', () => {
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

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockHttpRequest
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpRequest = mockHttpRequest
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
