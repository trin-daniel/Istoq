import { expressRouterAdapter } from '../adapters/express/express-route-adapter'
import { makeSignInControllerFactory } from '../factories/signin/signin-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signin', expressRouterAdapter(makeSignInControllerFactory()))
}
