import { SignInController } from './signin-controller'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helpers'
import { Authentication, EmailValidator, HttpRequest } from './signin-controller-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { internet, random } from 'faker'

type SutTypes = {
  sut: SignInController
  emailValidatorStub: EmailValidator
  authenticationStub: Authentication
}

const mockHttpRequest: HttpRequest = {
  body: {
    email: internet.email(),
    password: internet.password()
  }
}

const accessToken = random.uuid()

const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isEmail (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return Promise.resolve(accessToken)
    }
  }
  return new AuthenticationStub()
}

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication()
  const emailValidatorStub = mockEmailValidator()
  const sut = new SignInController(emailValidatorStub, authenticationStub)
  return {
    sut,
    emailValidatorStub,
    authenticationStub
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

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = mockHttpRequest
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith(httpRequest.body.email, httpRequest.body.password)
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(''))
    const httpRequest = mockHttpRequest
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.reject(new Error()))
    const httpRequest = mockHttpRequest
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockHttpRequest
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ accessToken }))
  })
})
