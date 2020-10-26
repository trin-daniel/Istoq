import { AuthMiddleware } from '@presentation/middlewares/auth-middleware'
import { Middleware } from '@presentation/protocols'
import { makeDbLoadAccountByTokenFactory } from '@main/factories/use-cases/account/load-account-by-token/db-load-account-by-token-factory'

export const makeAuthMiddlewareFactory = (): Middleware => {
  const dbLoadAccountByToken = makeDbLoadAccountByTokenFactory()
  return new AuthMiddleware(dbLoadAccountByToken)
}
