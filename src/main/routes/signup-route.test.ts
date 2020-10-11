import { app } from '../config/app'
import { SqlHelper } from '../../infra/database/helpers/sql-helper'
import { internet } from 'faker'
import request from 'supertest'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await SqlHelper.getConnection()
  })

  afterAll(async () => {
    await SqlHelper.end()
  })

  beforeEach(async () => {
    await SqlHelper.query('truncate table accounts')
  })

  test('Should return an account on success', async () => {
    const url = '/api/signup'
    const passwordFreeze = internet.password()
    const httpRequest = {
      name: internet.userName(),
      email: internet.email(),
      password: passwordFreeze,
      confirmation: passwordFreeze
    }
    await request(app)
      .post(url)
      .send(httpRequest)
      .expect(200)
  })
})
