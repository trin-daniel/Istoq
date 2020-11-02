import { Order } from '@domain/models/order'
import { orderParams } from '@domain/use-cases/order/add-order'

export interface AddOrderRepository {
  add (data: orderParams): Promise<Order>
}
