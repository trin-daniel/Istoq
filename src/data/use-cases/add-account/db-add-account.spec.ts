import { DbAddAccount } from './db-add-account'
import { Hasher } from '../../protocols/hasher'
import { internet } from 'faker'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
}

const hashedPassword = internet.password()
const params = {
  name: internet.userName(),
  email: internet.email(),
  password: internet.password()
}

const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve(hashedPassword)
    }
  }
  return new HasherStub()
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const sut = new DbAddAccount(hasherStub)
  return {
    sut,
    hasherStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct values', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(params)
    expect(hashSpy).toHaveBeenCalledWith(params.password)
  })
})
