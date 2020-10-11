import { expressRouterAdapter } from '../adapters/express-route-adapter'
import { makeSignUpControllerFactory } from '../factories/signup/signup-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', expressRouterAdapter(makeSignUpControllerFactory()))
}
