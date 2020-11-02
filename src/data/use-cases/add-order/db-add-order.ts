import { AddOrder, AddOrderRepository, orderParams, Order } from '@data/use-cases/add-order/db-add-order-protocols'

export class DbAddOrder implements AddOrder {
  constructor (private readonly addOrderRepository: AddOrderRepository) {}

  async add (data: orderParams): Promise<Order> {
    await this.addOrderRepository.add(data)
    return Promise.resolve(null)
  }
}
