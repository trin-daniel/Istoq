import { expressRouterAdapter } from '@main/adapters/express/express-route-adapter'
import { makeSignUpControllerFactory } from '@main/factories/controllers/signup/signup-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', expressRouterAdapter(makeSignUpControllerFactory()))
}
