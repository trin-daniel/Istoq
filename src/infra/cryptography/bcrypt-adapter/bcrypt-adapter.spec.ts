import { BcryptAdapter } from '@infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { internet, random } from 'faker'
import bcrypt from 'bcrypt'

type SutTypes = {
  sut: BcryptAdapter
}

const hashed = random.uuid()

jest.mock('bcrypt', () => {
  return {
    async hash (): Promise<string> {
      return hashed
    },
    async compare (): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
})

const salt = 12
const makeSut = (): SutTypes => {
  const sut = new BcryptAdapter(salt)
  return {
    sut
  }
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const { sut } = makeSut()
    const password = internet.password()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash(password)
    expect(hashSpy).toHaveBeenCalledWith(password, salt)
  })

  test('Should return a valid hash on hash success', async () => {
    const { sut } = makeSut()
    const password = internet.password()
    const hash = await sut.hash(password)
    expect(hash).toBe(hashed)
  })

  test('Should throw if hash throws', async () => {
    const { sut } = makeSut()
    const password = internet.password()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.hash(password)
    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct values', async () => {
    const { sut } = makeSut()
    const password = internet.password()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare(password, hashed)
    expect(compareSpy).toHaveBeenCalledWith(password, hashed)
  })

  test('Should return true when compare succeeds', async () => {
    const { sut } = makeSut()
    const password = internet.password()
    const isTrue = await sut.compare(password, hashed)
    expect(isTrue).toBe(true)
  })

  test('Should return false when compare fails', async () => {
    const { sut } = makeSut()
    const password = internet.password()
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const isFalse = await sut.compare(password, hashed)
    expect(isFalse).toBe(false)
  })

  test('Should throw if compare throws', async () => {
    const { sut } = makeSut()
    const password = internet.password()
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.compare(password, hashed)
    await expect(promise).rejects.toThrow()
  })
})
