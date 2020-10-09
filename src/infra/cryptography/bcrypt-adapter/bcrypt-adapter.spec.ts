import { BcryptAdapter } from './bcrypt-adapter'
import { internet } from 'faker'
import bcrypt from 'bcrypt'

const password = internet.password()

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash(password)
    expect(hashSpy).toHaveBeenCalledWith(password, salt)
  })
})
