import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest } from '../../helpers/http/http-helpers'
import { MissingParamError } from '../../errors'

export class SignUpController {
  handle (request: HttpRequest<any>): HttpResponse<any> {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
