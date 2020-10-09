import { DbAddAccount } from './db-add-account'
import { AccountModel, AddAccountParams, AddAccountRepository, Hasher } from './db-add-account-protocols'
import { internet, random } from 'faker'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const hashedPassword = internet.password()
const params = {
  name: internet.userName(),
  email: internet.email(),
  password: internet.password()
}

const mockAccount: AccountModel = {
  id: random.uuid(),
  ...params,
  password: hashedPassword,
  created_at: new Date(),
  updated_at: new Date()
}

const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve(hashedPassword)
    }
  }
  return new HasherStub()
}

const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (params: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccount)
    }
  }
  return new AddAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = mockAddAccountRepository()
  const hasherStub = mockHasher()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct values', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(params)
    expect(hashSpy).toHaveBeenCalledWith(params.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(params)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(params)
    expect(addSpy).toHaveBeenCalledWith({ ...params, password: hashedPassword })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(params)
    await expect(promise).rejects.toThrow()
  })
})
