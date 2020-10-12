import { SqlHelper as sut } from './sql-helper'

describe('Mysql Helper', () => {
  beforeAll(async () => {
    await sut.connect()
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mysql is down', async () => {
    let account = await sut.runQuery('SELECT * FROM accounts')
    expect(account).toBeTruthy()
    await sut.disconnect()

    account = await sut.runQuery('SELECT * FROM accounts')
    expect(account).toBeTruthy()
  })
})
