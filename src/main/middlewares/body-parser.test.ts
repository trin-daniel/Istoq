import request from 'supertest'
import { app } from '../config/app'
import { internet } from 'faker'

describe('Body Parser Middleware', () => {
  test('Should parser body as json', async () => {
    const name = internet.userName()
    const url = internet.url()
    app.post(`/${url}`, (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post(`/${url}`)
      .send({ name })
      .expect({ name })
  })
})
