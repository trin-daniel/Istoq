import { Order } from '@domain/models/order'
import { orderParams } from '@domain/use-cases/add-order/add-order'

export interface AddOrderRepository {
  add (data: orderParams): Promise<Order>
}
