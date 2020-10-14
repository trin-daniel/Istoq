import { SignInController } from './signin-controller'
import { badRequest, serverError } from '../../helpers/http/http-helpers'
import { EmailValidator } from '../../protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { internet } from 'faker'

type SutTypes = {
  sut: SignInController
  emailValidatorStub: EmailValidator
}

const mockHttpRequest = {
  body: {
    email: internet.email(),
    password: internet.password()
  }
}

const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isEmail (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const sut = new SignInController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignIn Controller', () => {
  test('Should return 400 if no e-mail is provided', async () => {
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

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isEmailSpy = jest.spyOn(emailValidatorStub, 'isEmail')
    const httpRequest = mockHttpRequest
    await sut.handle(httpRequest)
    expect(isEmailSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Should return 400 if an invalid e-mail is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isEmail').mockReturnValueOnce(false)
    const httpRequest = mockHttpRequest
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isEmail').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = mockHttpRequest
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
