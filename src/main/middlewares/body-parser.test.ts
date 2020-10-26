import { app } from '@main/config/app'
import { internet } from 'faker'
import request from 'supertest'

describe('Body Parser Middleware', () => {
  test('Should parser body as json', async () => {
    const name = internet.userName()
    const url = '/test_body_parser'
    app.post(url, (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post(url)
      .send({ name })
      .expect({ name })
  })
})
