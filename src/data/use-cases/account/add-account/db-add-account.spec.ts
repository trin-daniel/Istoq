import { DbAddAccount } from '@data/use-cases/account/add-account/db-add-account'
import { Account, AddAccountParams, AddAccountRepository, LoadAccountByEmailRepository, Hasher } from '@data/use-cases/account/add-account/db-add-account-protocols'
import { internet, random } from 'faker'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const hash = internet.password()
const authentication = {
  name: internet.userName(),
  email: internet.email(),
  password: internet.password()
}

const mockAccount = {
  id: random.uuid(),
  name: authentication.name,
  email: authentication.email,
  password: hash,
  created_at: new Date(),
  updated_at: new Date()
}

const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve(hash)
    }
  }
  return new HasherStub()
}

const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (params: AddAccountParams): Promise<Account> {
      return Promise.resolve(mockAccount)
    }
  }
  return new AddAccountRepositoryStub()
}

const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<Account> {
      return Promise.resolve(null)
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const hasherStub = mockHasher()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct values', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(authentication)
    expect(hashSpy).toHaveBeenCalledWith(authentication.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(authentication)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(authentication)
    expect(addSpy).toHaveBeenCalledWith({ ...authentication, password: hash })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(authentication)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(authentication)
    expect(account).toEqual(mockAccount)
  })

  test('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccount))
    const account = await sut.add(authentication)
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct e-mail', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(authentication)
    expect(loadByEmailSpy).toHaveBeenCalledWith(authentication.email)
  })
})
