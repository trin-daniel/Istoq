import { Order } from '@domain/models/order'

export type orderParams = {
  account_id: string,
  client: string,
  product: string,
  quantity: string,
  discount: string,
  price: string,
}

export interface AddOrder {
  add (data: orderParams): Promise<Order>
}
