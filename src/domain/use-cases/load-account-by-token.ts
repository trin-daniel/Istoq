import { Account } from '../models/account'

export interface LoadAccountByToken {
  loadByToken (accessToken: string): Promise<Account>
}
