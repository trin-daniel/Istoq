import { AddOrderController } from '@presentation/controllers/add-order/add-order-controller'
import { Controller } from '@presentation/protocols'
import { makeLogControllerDecorator } from '@main/factories/decorators/log/log-controller-decorator'
import { makeAddOrderValidationFactory } from '@main/factories/controllers/add-order/add-order-validation-factory'
import { makeDbAddOrderFactory } from '@main/factories/use-cases/order/add-order/db-add-order-factory'

export const makeAddOrderControllerFactory = (): Controller => {
  const addOrder = makeDbAddOrderFactory()
  const validation = makeAddOrderValidationFactory()
  const addOrderController = new AddOrderController(validation, addOrder)
  return makeLogControllerDecorator(addOrderController)
}
