import { expressRouterAdapter } from '@main/adapters/express/express-route-adapter'
import { makeSignInControllerFactory } from '@main/factories/controllers/signin/signin-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signin', expressRouterAdapter(makeSignInControllerFactory()))
}
