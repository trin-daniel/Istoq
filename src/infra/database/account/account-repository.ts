import { AddAccountRepository } from '../../../data/protocols/database/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../data/protocols/database/load-account-by-email-repository'
import { Account } from '../../../domain/models/account'
import { AddAccountParams } from '../../../domain/use-cases/add-account'
import { SqlHelper } from '../helpers/sql-helper'

export class AccountRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (params: AddAccountParams): Promise<Account> {
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

  async loadByEmail (email: string): Promise<Account> {
    const account = await SqlHelper.runQuery('SELECT * FROM accounts WHERE email = (?)', [email])
    return account[0][0]
      ? account[0][0]
      : null
  }
}
