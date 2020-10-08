import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../../protocols'
import { badRequest, serverError } from '../../helpers/http/http-helpers'
import { InvalidParamError, MissingParamError } from '../../errors'
import { AddAccount } from '../../../domain/use-cases/add-account'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (request: HttpRequest<any>): HttpResponse<any> {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmation']
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, confirmation } = request.body
      if (password !== confirmation) {
        return badRequest(new InvalidParamError('confirmation'))
      }
      const isEmail = this.emailValidator.isEmail(email)
      if (!isEmail) {
        return badRequest(new InvalidParamError('email'))
      }
      this.addAccount.add({ name, email, password })
    } catch (error) {
      return serverError()
    }
  }
}
