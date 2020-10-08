import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamError } from '../../errors'

export class SignUpController {
  handle (request: HttpRequest<any>): HttpResponse<any> {
    if (!request.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }

    if (!request.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
