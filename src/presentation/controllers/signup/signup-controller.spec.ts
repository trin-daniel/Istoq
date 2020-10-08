import { SignUpController } from './signup-controller'
import { HttpRequest } from '../../protocols/http'
import { badRequest } from '../../helpers/http/http-helpers'
import { MissingParamError } from '../../errors'
import { internet } from 'faker'

const mockRequest: HttpRequest<any> = {
  body: {
    name: internet.userName(),
    email: internet.email(),
    password: internet.password(),
    confirmation: internet.password()
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = { body: { ...mockRequest.body, name: undefined } }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()
    const httpRequest = { body: { ...mockRequest.body, email: undefined } }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', () => {
    const sut = new SignUpController()
    const httpRequest = { body: { ...mockRequest.body, password: undefined } }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
