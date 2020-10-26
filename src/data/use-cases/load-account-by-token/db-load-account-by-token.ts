import { Account, Decrypter, LoadAccountByToken, LoadAccountByTokenRepository } from '@data/use-cases/load-account-by-token/db-load-account-by-token-protocols'

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
