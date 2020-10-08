import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../../protocols'
import { badRequest, serverError } from '../../helpers/http/http-helpers'
import { InvalidParamError, MissingParamError } from '../../errors'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (request: HttpRequest<any>): HttpResponse<any> {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmation']
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (request.body.password !== request.body.confirmation) {
        return badRequest(new InvalidParamError('confirmation'))
      }
      const isEmail = this.emailValidator.isEmail(request.body.email)
      if (!isEmail) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
