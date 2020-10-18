import { JwtAdapter } from './jwt-adapter'
import { random } from 'faker'
import jwt from 'jsonwebtoken'

const id = random.uuid()
const mockAccessToken = random.uuid()

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve(mockAccessToken)
  }
}))

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt(id)
    expect(signSpy).toHaveBeenCalledWith({ id }, 'secret', { expiresIn: '1d' })
  })

  test('Should return a token when sign succeeds', async () => {
    const sut = new JwtAdapter('secret')
    const accessToken = await sut.encrypt(id)
    expect(accessToken).toBe(mockAccessToken)
  })
})
