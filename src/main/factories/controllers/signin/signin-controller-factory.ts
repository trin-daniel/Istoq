import { SignInController } from '../../../../presentation/controllers/signin/signin-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log/log-controller-decorator'
import { makeDbAuthenticationFactory } from '../../use-cases/account/authentication/db-authentication-factory'
import { makeSignInValidationFactory } from './signin-validation-factory'

export const makeSignInControllerFactory = (): Controller => {
  const authentication = makeDbAuthenticationFactory()
  const signinValidation = makeSignInValidationFactory()
  const signinController = new SignInController(authentication, signinValidation)
  return makeLogControllerDecorator(signinController)
}
