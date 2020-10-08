import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest } from '../../helpers/http/http-helpers'
import { MissingParamError } from '../../errors'

export class SignUpController {
  handle (request: HttpRequest<any>): HttpResponse<any> {
    if (!request.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!request.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
