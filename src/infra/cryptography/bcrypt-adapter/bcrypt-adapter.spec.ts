import { BcryptAdapter } from './bcrypt-adapter'
import { internet, random } from 'faker'
import bcrypt from 'bcrypt'

const hashedPassword = random.uuid()

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return hashedPassword
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const password = internet.password()
    await sut.hash(password)
    expect(hashSpy).toHaveBeenCalledWith(password, salt)
  })

  test('Should return a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const password = internet.password()
    const hash = await sut.hash(password)
    expect(hash).toBe(hashedPassword)
  })
})
