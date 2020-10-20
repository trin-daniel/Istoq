import { DbAuthentication } from '../../../../data/use-cases/authentication/db-authentication'
import { Authentication } from '../../../../domain/use-cases/authentication'
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountRepository } from '../../../../infra/database/account/account-repository'

export const makeDbAuthenticationFactory = (): Authentication => {
  const salt = 12
  const accountRepository = new AccountRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET || 'secret')
  return new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter, accountRepository)
}
