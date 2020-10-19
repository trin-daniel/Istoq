import { DbAuthentication } from '../../../data/use-cases/authentication/db-authentication'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountRepository } from '../../../infra/database/account/account-repository'
import { LogRepository } from '../../../infra/reports/log/log-repository'
import { SignInController } from '../../../presentation/controllers/signin/signin-controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignInValidationFactory } from './signin-validation-factory'

export const makeSignInControllerFactory = (): Controller => {
  const salt = 12
  const accountRepository = new AccountRepository()
  const logRepository = new LogRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET || 'secret')
  const authentication = new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter, accountRepository)
  const signinValidation = makeSignInValidationFactory()
  const signinController = new SignInController(authentication, signinValidation)
  return new LogControllerDecorator(signinController, logRepository)
}
