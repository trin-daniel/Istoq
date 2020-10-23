import { Account } from '../../models/account'

export interface LoadAccountByToken {
  load (accessToken: string): Promise<Account>
}
