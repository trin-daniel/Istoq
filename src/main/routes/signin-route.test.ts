import { SqlHelper } from '@infra/database/helpers/connection-helper'
import { app } from '@main/config/app'
import { internet, random } from 'faker'
import { hash } from 'bcrypt'
import request from 'supertest'

describe('SignIn Routes', () => {
  beforeAll(async () => await SqlHelper.connect())
  afterAll(async () => await SqlHelper.disconnect())
  beforeEach(async () => await SqlHelper.runQuery('delete from accounts'))

  test('Should return 200 on signin', async () => {
    const id = random.uuid()
    const name = internet.userName()
    const email = internet.email()
    const password = internet.password()
    const hashed = await hash(password, 12)
    const created_at = new Date()
    const updated_at = new Date()
    await SqlHelper.runQuery(
      'INSERT INTO accounts (id, name, email, password, created_at, updated_at) VALUES(?,?,?,?,?,?)',
      [id, name, email, hashed, created_at, updated_at]
    )
    const authentication = {
      email,
      password
    }
    await request(app)
      .post('/api/signin')
      .send(authentication)
      .expect(200)
  })

  test('Should return 401 on signin', async () => {
    const authentication = {
      email: internet.email(),
      password: internet.password()
    }
    await request(app)
      .post('/api/signin')
      .send(authentication)
      .expect(401)
  })
})
