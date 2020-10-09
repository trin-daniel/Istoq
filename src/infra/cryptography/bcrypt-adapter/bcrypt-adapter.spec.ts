import { BcryptAdapter } from './bcrypt-adapter'
import { internet, random } from 'faker'
import bcrypt from 'bcrypt'

const hashedPassword = random.uuid()

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return hashedPassword
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const password = internet.password()
    await sut.hash(password)
    expect(hashSpy).toHaveBeenCalledWith(password, salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const password = internet.password()
    const hash = await sut.hash(password)
    expect(hash).toBe(hashedPassword)
  })
})
