import { OrderRepository } from '@infra/database/order/order-repository'
import { SqlHelper } from '@infra/database/helpers'
import { internet, random } from 'faker'

type SutTypes = {
  sut: OrderRepository
}

const body = {
  account_id: random.uuid(),
  client: internet.userName(),
  product: random.word(),
  quantity: random.number().toString(),
  discount: random.number(100).toString(),
  price: random.float().toString()
}

const makeSut = (): SutTypes => {
  const sut = new OrderRepository()
  return {
    sut
  }
}

describe('Order Repository', () => {
  beforeAll(async () => await SqlHelper.connect())
  afterAll(async () => await SqlHelper.disconnect())
  beforeEach(async () => await SqlHelper.runQuery('TRUNCATE TABLE orders'))

  test('Should add a new order on success', async () => {
    const { sut } = makeSut()
    const data = body
    const order = await sut.add(data)
    expect(order).toBeTruthy()
    expect(order.id).toBeTruthy()
    expect(order.client).toBeTruthy()
  })
})
