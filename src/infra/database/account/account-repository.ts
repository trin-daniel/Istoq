import { AddAccountRepository } from '../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../domain/models/account-model'
import { AddAccountParams } from '../../../domain/use-cases/add-account'
import { SqlHelper } from '../helpers/sql-helper'

export class AccountRepository implements AddAccountRepository {
  async add (params: AddAccountParams): Promise<AccountModel> {
    const { name, email, password } = params
    const id = `${Date.now()}${Math.random().toString(36).substr(2, 6)}`
    const created_at = new Date()
    const updated_at = new Date()
    await SqlHelper.runQuery(
      'INSERT INTO accounts (id, name, email, password, created_at, updated_at) VALUES(?,?,?,?,?,?)',
      [id, name, email, password, created_at, updated_at]
    )

    const account = await SqlHelper.runQuery('SELECT * FROM accounts WHERE id = (?)', [id])
    return account[0][0]
  }
}
