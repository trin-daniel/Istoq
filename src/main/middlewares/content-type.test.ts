import { app } from '../config/app'
import request from 'supertest'

describe('Content Type Middleware', () => {
  test('Should return default content type as json', async () => {
    const url = '/test_content_type'
    app.get(url, (req, res) => {
      res.send()
    })
    await request(app)
      .get(url)
      .expect('content-type', /json/)
  })

  test('Should return xml content type when forced', async () => {
    const url = '/test_content_type_xml'
    app.get(url, (req, res) => {
      res.type('xml')
      res.send()
    })
    await request(app)
      .get(url)
      .expect('content-type', /xml/)
  })
})
