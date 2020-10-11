import { DbAddAccount } from '../../../data/use-cases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '../../../infra/database/account/account-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeSignUpControllerFactory = (): SignUpController => {
  const salt = 12
  const accountRepository = new AccountRepository()
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
