import { AddOrder, AddOrderRepository, orderParams, Order } from '@data/use-cases/order/add-order/db-add-order-protocols'

export class DbAddOrder implements AddOrder {
  constructor (private readonly addOrderRepository: AddOrderRepository) {}

  async add (data: orderParams): Promise<Order> {
    const order = await this.addOrderRepository.add(data)
    return order
  }
}
