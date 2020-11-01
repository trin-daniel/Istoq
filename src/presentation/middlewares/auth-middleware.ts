import { HttpRequest, HttpResponse, LoadAccountByToken, Middleware } from '@presentation/middlewares/auth-middleware-protocols'
import { AccessDeniedError } from '@presentation/errors'
import { forbidden, ok, serverError } from '@presentation/helpers/http/http-helpers'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const token = request.headers?.['x-access-token']
      if (token) {
        const account = await this.loadAccountByToken.load(token)
        return account
          ? ok({ account_id: account.id })
          : forbidden(new AccessDeniedError())
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
