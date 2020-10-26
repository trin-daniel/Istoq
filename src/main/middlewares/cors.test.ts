import { app } from '@main/config/app'
import request from 'supertest'

describe('Cors Middleware', () => {
  test('Should enable cors', async () => {
    const url = '/test_cors'
    app.get(url, (req, res) => {
      res.send()
    })
    await request(app)
      .get(url)
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
