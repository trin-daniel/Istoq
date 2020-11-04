import { OrderRepository } from '@infra/database/order/order-repository'
import { SqlHelper } from '@infra/database/helpers'
import { internet, random } from 'faker'

type SutTypes = {
  sut: OrderRepository
}

const mockId = random.uuid()
const body = {
  account_id: mockId,
  client: internet.userName(),
  product: random.word(),
  quantity: random.number().toString(),
  discount: random.number(100).toString(),
  price: random.float().toString()
}

const accountData = {
  name: internet.userName(),
  email: internet.email(),
  password: internet.password()
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
  beforeEach(async () => await SqlHelper.runQuery('delete from orders'))

  test('Should add a new order on success', async () => {
    const { name, email, password } = accountData
    const id = mockId
    const created_at = new Date()
    const updated_at = new Date()
    await SqlHelper.runQuery(
      'INSERT INTO accounts (id, name, email, password, created_at, updated_at) VALUES(?,?,?,?,?,?)',
      [id, name, email, password, created_at, updated_at]
    )
    const { sut } = makeSut()
    const data = body
    const order = await sut.add(data)
    expect(order).toBeTruthy()
    expect(order.id).toBeTruthy()
    expect(order.client).toBeTruthy()
  })
})
