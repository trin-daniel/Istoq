import { app } from '../config/app'
import { SqlHelper } from '../../infra/database/helpers/connection-helper'
import { internet } from 'faker'
import { hash } from 'bcrypt'
import request from 'supertest'

describe('SignIn Routes', () => {
  beforeAll(async () => {
    await SqlHelper.connect()
  })

  afterAll(async () => {
    await SqlHelper.disconnect()
  })

  beforeEach(async () => {
    await SqlHelper.runQuery('truncate table accounts')
  })

  afterEach(async () => {
    await SqlHelper.runQuery('truncate table accounts')
  })

  test('Should return 200 on signin', async () => {
    const url = '/api/signin'
    const id = `${Date.now()}${Math.random().toString(36).substr(2, 6)}`
    const name = internet.userName()
    const email = internet.email()
    const password = internet.password()
    const hashedPassword = await hash(password, 12)
    const created_at = new Date()
    const updated_at = new Date()
    await SqlHelper.runQuery(
      'INSERT INTO accounts (id, name, email, password, created_at, updated_at) VALUES(?,?,?,?,?,?)',
      [id, name, email, hashedPassword, created_at, updated_at]
    )
    const httpRequest = {
      email,
      password
    }
    await request(app)
      .post(url)
      .send(httpRequest)
      .expect(200)
  })

  test('Should return 401 on signin', async () => {
    const url = '/api/signin'
    const httpRequest = {
      email: internet.email(),
      password: internet.password()
    }
    await request(app)
      .post(url)
      .send(httpRequest)
      .expect(401)
  })
})
