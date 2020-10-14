import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http/http-helpers'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class SignInController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return Promise.resolve(badRequest(new MissingParamError('email')))
      }

      if (!password) {
        return Promise.resolve(badRequest(new MissingParamError('password')))
      }
      const isEmail = this.emailValidator.isEmail(email)
      if (!isEmail) {
        return Promise.resolve(badRequest(new InvalidParamError('email')))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
