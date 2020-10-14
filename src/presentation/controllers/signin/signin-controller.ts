import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class SignInController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve(badRequest(new MissingParamError('email')))
  }
}
