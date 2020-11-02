import { AddAccount } from '@domain/use-cases/account/add-account'
import { DbAddAccount } from '@data/use-cases/account/add-account/db-add-account'
import { BcryptAdapter } from '@infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '@infra/database/account/account-repository'

export const makeDbAddAccountFactory = (): AddAccount => {
  const salt = 12
  const accountRepository = new AccountRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbAddAccount(bcryptAdapter, accountRepository, accountRepository)
}
