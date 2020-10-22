import { Account } from '../../../domain/models/account'
import { LoadAccountByToken } from '../../../domain/use-cases/load-account-by-token'
import { Decrypter } from '../../protocols/cryptography/decrypter'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async load (accessToken: string): Promise<Account> {
    await this.decrypter.decrypt(accessToken)
    return Promise.resolve(null)
  }
}
