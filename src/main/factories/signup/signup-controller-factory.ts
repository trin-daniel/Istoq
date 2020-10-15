import { DbAddAccount } from '../../../data/use-cases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '../../../infra/database/account/account-repository'
import { LogRepository } from '../../../infra/reports/log/log-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignUpValidationFactory } from './signup-validation-factory'

export const makeSignUpControllerFactory = (): Controller => {
  const salt = 12
  const accountRepository = new AccountRepository()
  const logRepository = new LogRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  const signupValidation = makeSignUpValidationFactory()
  const signupController = new SignUpController(dbAddAccount, signupValidation)
  return new LogControllerDecorator(signupController, logRepository)
}
