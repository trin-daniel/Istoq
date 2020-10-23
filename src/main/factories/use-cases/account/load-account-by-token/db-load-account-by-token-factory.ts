import { DbLoadAccountByToken } from '../../../../../data/use-cases/load-account-by-token/db-load-account-by-token'
import { LoadAccountByToken } from '../../../../../domain/use-cases/account/load-account-by-token'
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountRepository } from '../../../../../infra/database/account/account-repository'

export const makeDbLoadAccountByTokenFactory = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const accountRepository = new AccountRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountRepository)
}
