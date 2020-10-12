import { DbAddAccount } from '../../../data/use-cases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '../../../infra/database/account/account-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'

export const makeSignUpControllerFactory = (): Controller => {
  const salt = 12
  const accountRepository = new AccountRepository()
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  const signupController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  return new LogControllerDecorator(signupController)
}
