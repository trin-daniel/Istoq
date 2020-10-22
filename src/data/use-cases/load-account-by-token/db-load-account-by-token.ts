import { Account } from '../../../domain/models/account'
import { LoadAccountByToken } from '../../../domain/use-cases/load-account-by-token'
import { Decrypter } from '../../protocols/cryptography/decrypter'
import { LoadAccountByTokenRepository } from '../../protocols/database/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string): Promise<Account> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepositoryStub.loadByToken(accessToken)
      if (account) {
        return account
      }
    }
    return null
  }
}
