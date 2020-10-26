import { Account } from '@domain/models/account'

export interface LoadAccountByToken {
  load (accessToken: string): Promise<Account>
}
