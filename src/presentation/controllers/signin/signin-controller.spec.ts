import { SignInController } from './signin-controller'
import { badRequest } from '../../helpers/http/http-helpers'
import { MissingParamError } from '../../errors'
import { internet } from 'faker'

const mockHttpRequest = {
  body: {
    email: internet.email(),
    password: internet.password()
  }
}

describe('SignIn Controller', () => {
  test('Should return 400 if no e-mail is provided', async () => {
    const sut = new SignInController()
    const httpRequest = { body: { ...mockHttpRequest.body, email: undefined } }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
