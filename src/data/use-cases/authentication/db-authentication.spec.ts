import { DbAuthentication } from './db-authentication'
import { Account } from '../../../domain/models/account'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import { AuthenticationParams } from '../../../domain/use-cases/authentication'
import { internet, random } from 'faker'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const mockAuthentication: AuthenticationParams = {
  email: internet.email(),
  password: internet.password()
}

const mockAccount: Account = {
  id: random.uuid(),
  name: internet.userName(),
  email: internet.email(),
  password: internet.password(),
  created_at: new Date(),
  updated_at: new Date()
}

const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<Account> {
      return Promise.resolve(mockAccount)
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct e-mail', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(mockAuthentication)
    expect(loadSpy).toHaveBeenCalledWith(mockAuthentication.email)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(mockAuthentication)
    await expect(promise).rejects.toThrow()
  })
})
