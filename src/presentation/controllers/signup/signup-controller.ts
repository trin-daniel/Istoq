import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest } from '../../helpers/http/http-helpers'
import { MissingParamError } from '../../errors'
import { Controller } from '../../protocols/controller'

export class SignUpController implements Controller {
  handle (request: HttpRequest<any>): HttpResponse<any> {
    const requiredFields = ['name', 'email', 'password', 'confirmation']
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
