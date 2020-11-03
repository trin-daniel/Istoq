import { SqlHelper } from '@infra/database/helpers'
import { app } from '@main/config/app'
import { HttpRequest } from '@presentation/protocols'
import { internet, random } from 'faker'
import request from 'supertest'

const mockRequest: HttpRequest = {
  body: {
    client: internet.userName(),
    product: random.word(),
    quantity: random.number().toString(),
    discount: random.number(100).toString(),
    price: random.float().toString()
  }
}

describe('Order Route', () => {
  beforeAll(async () => await SqlHelper.connect())
  afterAll(async () => await SqlHelper.disconnect())
  beforeEach(async () => await SqlHelper.runQuery('TRUNCATE TABLE orders'))

  test('Should return 403 if token is not provided', async () => {
    await request(app)
      .post('/api/orders')
      .send(mockRequest)
      .expect(403)
  })
})
