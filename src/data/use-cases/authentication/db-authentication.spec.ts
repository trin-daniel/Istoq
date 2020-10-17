import { DbAuthentication } from './db-authentication'
import { Account } from '../../../domain/models/account'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import { internet, random } from 'faker'

const mockAuthentication = {
  email: internet.email(),
  password: internet.password()
}

const mockAccount = {
  id: random.uuid(),
  name: internet.userName(),
  email: internet.email(),
  password: internet.password(),
  created_at: new Date(),
  updated_at: new Date()
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct e-mail', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async load (email: string): Promise<Account> {
        return Promise.resolve(mockAccount)
      }
    }
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(mockAuthentication)
    expect(loadSpy).toHaveBeenCalledWith(mockAuthentication.email)
  })
})
