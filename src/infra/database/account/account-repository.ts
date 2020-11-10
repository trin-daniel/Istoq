import { Account } from '@domain/models/account'
import { AddAccountParams } from '@domain/use-cases/account/add-account'
import { LoadAccountByEmailRepository } from '@data/protocols/database/account/load-account-by-email-repository'
import { LoadAccountByTokenRepository } from '@data/protocols/database/account/load-account-by-token-repository'
import { UpdateAccessTokenRepository } from '@data/protocols/database/account/update-access-token-repository'
import { AddAccountRepository } from '@data/protocols/database/account/add-account-repository'
import { SqlHelper, uuid } from '@infra/database/helpers/'

export class AccountRepository implements AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository {
  async add (params: AddAccountParams): Promise<Account> {
    const { name, email, password } = params
    const id = uuid.generate()
    const created_at = new Date()
    const updated_at = new Date()
    await SqlHelper.runQuery(
      'INSERT INTO accounts (id, name, email, password, created_at, updated_at) VALUES(?,?,?,?,?,?)',
      [id, name, email, password, created_at, updated_at]
    )

    const account = await SqlHelper.runQuery('SELECT * FROM accounts WHERE id = (?)', [id])
    return account[0]
  }

  async loadByEmail (email: string): Promise<Account> {
    const account = await SqlHelper.runQuery('SELECT * FROM accounts WHERE email = (?)', [email])
    return account[0] || null
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const updated_at = new Date()
    await SqlHelper.runQuery('UPDATE accounts SET token = (?), updated_at= (?) WHERE id= (?)', [token, updated_at, id])
  }

  async loadByToken (token: string): Promise<Account> {
    const account = await SqlHelper.runQuery('SELECT * FROM accounts WHERE token = (?)', [token])
    return account[0] || null
  }
}
