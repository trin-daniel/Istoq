import { AuthMiddleware } from './auth-middleware'
import { forbidden } from '../helpers/http/http-helpers'
import { AccessDeniedError } from '../errors'
import { HttpRequest } from '../protocols'
import { Account } from '../../domain/models/account'
import { LoadAccountByToken } from '../../domain/use-cases/load-account-by-token'
import { internet, random } from 'faker'

const mockHttpRequest: HttpRequest = {
  headers: {
    'x-access-token': random.uuid()
  }
}

const mockAccount = {
  id: random.uuid(),
  name: internet.userName(),
  email: internet.email(),
  password: internet.password(),
  created_at: new Date(),
  updated_at: new Date()
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async loadByToken (accessToken: string): Promise<Account> {
        return Promise.resolve(mockAccount)
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub()
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async loadByToken (accessToken: string): Promise<Account> {
        return Promise.resolve(mockAccount)
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub()
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenStub, 'loadByToken')
    const httpRequest = mockHttpRequest
    await sut.handle(httpRequest)
    expect(loadByTokenSpy).toHaveBeenCalledWith(httpRequest.headers['x-access-token'])
  })
})
