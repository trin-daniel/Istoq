import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { EmailValidator } from '../../protocols/email-validator'
import { badRequest } from '../../helpers/http/http-helpers'
import { InvalidParamError, MissingParamError } from '../../errors'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (request: HttpRequest<any>): HttpResponse<any> {
    const requiredFields = ['name', 'email', 'password', 'confirmation']
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isEmail = this.emailValidator.isEmail(request.body.email)
    if (!isEmail) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
