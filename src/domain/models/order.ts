export type Order = {
  id: string,
  account_id?: string,
  client: string,
  product: string,
  quantity: string,
  discount: string,
  price: string,
  created_at: Date
}
