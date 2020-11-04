import { JwtAdapter } from '@infra/cryptography/jwt-adapter/jwt-adapter'
import { random } from 'faker'
import jwt from 'jsonwebtoken'

const id = random.uuid()
const mockToken = random.uuid()

jest.mock('jsonwebtoken', () => {
  return {
    sign (): string {
      return mockToken
    },
    verify (): string {
      return id
    }
  }
})

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.encrypt(id)
    expect(signSpy).toHaveBeenCalledWith({ id }, 'secret', { expiresIn: '1d' })
  })

  test('Should return a token when sign succeeds', () => {
    const sut = makeSut()
    const token = sut.encrypt(id)
    expect(token).toBe(mockToken)
  })

  test('Should throw if sign throws', () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    expect(sut.encrypt).toThrow()
  })

  test('Should call verify with correct values', () => {
    const sut = makeSut()
    const verifySpy = jest.spyOn(jwt, 'verify')
    sut.decrypt(mockToken)
    expect(verifySpy).toHaveBeenCalledWith(mockToken, 'secret')
  })

  test('Should return a value on verify success', async () => {
    const sut = makeSut()
    const value = sut.decrypt(mockToken)
    expect(value).toBe(id)
  })

  test('Should throw if verify throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw new Error() })
    expect(sut.decrypt).toThrow()
  })
})
