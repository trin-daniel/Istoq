import { expressMiddlewareAdapter } from '@main/adapters/express/express-middleware-adapter'
import { expressRouterAdapter } from '@main/adapters/express/express-route-adapter'
import { makeAddOrderControllerFactory } from '@main/factories/controllers/add-order/add-order-controller-factory'
import { makeAuthMiddlewareFactory } from '@main/factories/middlewares/auth-middleware-factory'
import { Router } from 'express'

export default (router: Router): void => {
  const auth = expressMiddlewareAdapter(makeAuthMiddlewareFactory())
  router.post('/orders', auth, expressRouterAdapter(makeAddOrderControllerFactory()))
}
