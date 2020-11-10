import { Order } from '@domain/models/order'
import { orderParams } from '@domain/use-cases/order/add-order'
import { AddOrderRepository } from '@data/protocols/database/order/add-order-repository'
import { SqlHelper, uuid } from '@infra/database/helpers'

export class OrderRepository implements AddOrderRepository {
  async add (data: orderParams): Promise<Order> {
    const id = uuid.generate()
    const created_at = new Date()
    const { account_id, client, product, quantity, discount, price } = data
    await SqlHelper.runQuery(
      'INSERT INTO orders (id, account_id, client ,product, quantity, price, discount ,created_at) VALUES (?,?,?,?,?,?,?,?)',
      [id, account_id, client, product, quantity, price, discount, created_at])
    const order = await SqlHelper.runQuery('SELECT * FROM orders WHERE id = (?)', [id])
    return order[0]
  }
}
