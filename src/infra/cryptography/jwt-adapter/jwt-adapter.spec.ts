import { JwtAdapter } from './jwt-adapter'
import { random } from 'faker'
import jwt from 'jsonwebtoken'

const id = random.uuid()

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt(id)
    expect(signSpy).toHaveBeenCalledWith({ id }, 'secret', { expiresIn: '1d' })
  })
})
