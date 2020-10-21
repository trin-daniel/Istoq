import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helpers'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve(forbidden(new AccessDeniedError()))
  }
}
