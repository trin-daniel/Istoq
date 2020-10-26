import { HttpRequest, HttpResponse, LoadAccountByToken, Middleware } from '@presentation/middlewares/auth-middleware-protocols'
import { forbidden, ok, serverError } from '@presentation/helpers/http/http-helpers'
import { AccessDeniedError } from '@presentation/errors'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken)
        if (account) {
          return ok({ account_id: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
