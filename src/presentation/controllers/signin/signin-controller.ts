import { Authentication, Controller, HttpRequest, HttpResponse, Validation } from '@presentation/controllers/signin/signin-controller-protocols'
import { badRequest, ok, serverError, unauthorized } from '@presentation/helpers/http/http-helpers'

export class SignInController implements Controller {
  constructor (private readonly authentication: Authentication, private readonly validation: Validation) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body)
      if (error) return badRequest(error)

      const token = await this.authentication.auth(request.body)
      return !token
        ? unauthorized()
        : ok({ token })
    } catch (error) {
      return serverError(error)
    }
  }
}
