import { AccountRepository } from '@infra/database/account/account-repository'
import { SqlHelper } from '@infra/database/helpers/connection-helper'
import { internet, random } from 'faker'

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

  afterEach(async () => {
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

  test('Should return null if loadByEmail returns null', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail(params.email)
    expect(account).toBeFalsy()
  })

  test('Should update the account accessToken on updateAccessToken success', async () => {
    const { name, email, password } = params
    const id = `${Date.now()}${Math.random().toString(36).substr(2, 6)}`
    const created_at = new Date()
    const updated_at = new Date()
    await SqlHelper.runQuery(
      'INSERT INTO accounts (id, name, email, password, created_at, updated_at) VALUES(?,?,?,?,?,?)',
      [id, name, email, password, created_at, updated_at]
    )
    const sut = makeSut()
    const accessToken = random.uuid()
    await sut.updateAccessToken(id, accessToken)
    const account = await SqlHelper.runQuery('SELECT * FROM accounts WHERE id = (?)', [id])
    expect(account[0][0]).toBeTruthy()
    expect(account[0][0].token).toBe(accessToken)
  })

  test('Should return an account on loadByToken success', async () => {
    const { name, email, password } = params
    const id = `${Date.now()}${Math.random().toString(36).substr(2, 6)}`
    const accessToken = random.uuid()
    const created_at = new Date()
    const updated_at = new Date()
    await SqlHelper.runQuery(
      'INSERT INTO accounts (id, token, name, email, password, created_at, updated_at) VALUES(?,?,?,?,?,?,?)',
      [id, accessToken, name, email, password, created_at, updated_at]
    )
    const sut = makeSut()
    const account = await sut.loadByToken(accessToken)
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(params.name)
    expect(account.email).toBe(params.email)
    expect(account.password).toBe(params.password)
  })

  test('Should return null if loadByToken fails', async () => {
    const sut = makeSut()
    const accessToken = random.uuid()
    const account = await sut.loadByToken(accessToken)
    expect(account).toBeFalsy()
  })
})
