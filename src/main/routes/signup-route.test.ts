import { app } from '../config/app'
import request from 'supertest'
import { internet } from 'faker'

describe('SignUp Routes', () => {
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
