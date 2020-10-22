import { JwtAdapter } from './jwt-adapter'
import { random } from 'faker'
import jwt from 'jsonwebtoken'

const id = random.uuid()
const mockAccessToken = random.uuid()

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve(mockAccessToken)
  },

  async verify (): Promise<string> {
    return Promise.resolve(id)
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt(id)
    expect(signSpy).toHaveBeenCalledWith({ id }, 'secret', { expiresIn: '1d' })
  })

  test('Should return a token when sign succeeds', async () => {
    const sut = makeSut()
    const accessToken = await sut.encrypt(id)
    expect(accessToken).toBe(mockAccessToken)
  })

  test('Should throw if sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.encrypt(id)
    await expect(promise).rejects.toThrow()
  })

  test('Should call verify with correct values', async () => {
    const sut = makeSut()
    const verifySpy = jest.spyOn(jwt, 'verify')
    await sut.decrypt(mockAccessToken)
    expect(verifySpy).toHaveBeenCalledWith(mockAccessToken, 'secret')
  })
})
