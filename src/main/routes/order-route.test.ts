import { SqlHelper } from '@infra/database/helpers'
import { app } from '@main/config/app'
import { HttpRequest } from '@presentation/protocols'
import { hash } from 'bcrypt'
import { internet, random } from 'faker'
import { sign } from 'jsonwebtoken'
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
      .send(mockRequest.body)
      .expect(403)
  })

  test('Should return 200 if token is provided', async () => {
    const id = random.uuid()
    const token = sign({ id }, 'secret', { expiresIn: '1d' })
    const name = internet.userName()
    const email = internet.email()
    const password = internet.password()
    const hashed = await hash(password, 12)
    const created_at = new Date()
    const updated_at = new Date()
    await SqlHelper.runQuery(
      'INSERT INTO accounts (id, token, name, email, password, created_at, updated_at) VALUES(?,?,?,?,?,?,?)',
      [id, token, name, email, hashed, created_at, updated_at]
    )
    await request(app)
      .post('/api/orders')
      .set('x-access-token', token)
      .send(mockRequest.body)
      .expect(200)
  })
})
