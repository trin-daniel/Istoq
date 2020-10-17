import { BcryptAdapter } from './bcrypt-adapter'
import { internet, random } from 'faker'
import bcrypt from 'bcrypt'

const hashedPassword = random.uuid()

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return hashedPassword
  },
  async compare (): Promise<boolean> {
    return Promise.resolve(true)
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const password = internet.password()
    await sut.hash(password)
    expect(hashSpy).toHaveBeenCalledWith(password, salt)
  })

  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const password = internet.password()
    const hash = await sut.hash(password)
    expect(hash).toBe(hashedPassword)
  })

  test('Should throw if hash throws', async () => {
    const sut = makeSut()
    const password = internet.password()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.hash(password)
    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    const password = internet.password()
    await sut.compare(password, hashedPassword)
    expect(compareSpy).toHaveBeenCalledWith(password, hashedPassword)
  })
})
