import { SqlHelper } from '@infra/database/helpers/connection-helper'
import { app } from '@main/config/app'
import { internet } from 'faker'
import request from 'supertest'

describe('SignUp Routes', () => {
  beforeAll(async () => await SqlHelper.connect())
  afterAll(async () => await SqlHelper.disconnect())
  beforeEach(async () => await SqlHelper.runQuery('delete from accounts'))

  test('Should return an account on success', async () => {
    const password = internet.password()
    const body = {
      name: internet.userName(),
      email: internet.email(),
      password,
      confirmation: password
    }
    await request(app)
      .post('/api/signup')
      .send(body)
      .expect(200)
  })
})
