import { Account } from '@domain/models/account'

export interface LoadAccountByTokenRepository {
  loadByToken (token: string): Promise<Account>
}
