import { AddOrder } from '@domain/use-cases/order/add-order'
import { DbAddOrder } from '@data/use-cases/order/add-order/db-add-order'
import { OrderRepository } from '@infra/database/order/order-repository'

export const makeDbAddOrderFactory = (): AddOrder => {
  const orderRepository = new OrderRepository()
  return new DbAddOrder(orderRepository)
}
