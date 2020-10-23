import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log/log-controller-decorator'
import { makeDbAddAccountFactory } from '../../use-cases/account/add-account/db-add-account-factory'
import { makeDbAuthenticationFactory } from '../../use-cases/account/authentication/db-authentication-factory'
import { makeSignUpValidationFactory } from './signup-validation-factory'

export const makeSignUpControllerFactory = (): Controller => {
  const dbAddAccount = makeDbAddAccountFactory()
  const authentication = makeDbAuthenticationFactory()
  const signupValidation = makeSignUpValidationFactory()
  const signupController = new SignUpController(dbAddAccount, signupValidation, authentication)
  return makeLogControllerDecorator(signupController)
}
