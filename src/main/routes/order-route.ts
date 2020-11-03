import { expressRouterAdapter } from '@main/adapters/express/express-route-adapter'
import { makeAddOrderControllerFactory } from '@main/factories/controllers/add-order/add-order-controller-factory'
import { authUser } from '@main/middlewares/auth-user'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/orders', authUser, expressRouterAdapter(makeAddOrderControllerFactory()))
}
