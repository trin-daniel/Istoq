import { SignInController } from './signin-controller'
import { badRequest } from '../../helpers/http/http-helpers'
import { MissingParamError } from '../../errors'
import { internet } from 'faker'

type SutTypes = {
  sut: SignInController
}

const mockHttpRequest = {
  body: {
    email: internet.email(),
    password: internet.password()
  }
}

const makeSut = (): SutTypes => {
  const sut = new SignInController()
  return {
    sut
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
})
