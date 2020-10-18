import { AccountRepository } from './account-repository'
import { SqlHelper } from '../helpers/sql-helper'
import { internet } from 'faker'

const params = {
  name: internet.userName(),
  email: internet.email(),
  password: internet.password()
}

const makeSut = (): AccountRepository => {
  return new AccountRepository()
}

describe('Account Repository', () => {
  beforeAll(async () => {
    await SqlHelper.connect()
  })

  afterAll(async () => {
    await SqlHelper.disconnect()
  })

  beforeEach(async () => {
    await SqlHelper.runQuery('truncate table accounts')
  })

  test('Should return an account on add with success', async () => {
    const sut = makeSut()
    const account = await sut.add(params)
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(params.name)
    expect(account.email).toBe(params.email)
    expect(account.password).toBe(params.password)
  })

  test('Should return an account on loadByEmail success', async () => {
    const { name, email, password } = params
    const id = `${Date.now()}${Math.random().toString(36).substr(2, 6)}`
    const created_at = new Date()
    const updated_at = new Date()
    await SqlHelper.runQuery(
      'INSERT INTO accounts (id, name, email, password, created_at, updated_at) VALUES(?,?,?,?,?,?)',
      [id, name, email, password, created_at, updated_at]
    )
    const sut = makeSut()
    const account = await sut.loadByEmail(params.email)
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(params.name)
    expect(account.email).toBe(params.email)
    expect(account.password).toBe(params.password)
  })
})
