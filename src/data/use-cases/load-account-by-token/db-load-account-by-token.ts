import { Account, Decrypter, LoadAccountByToken, LoadAccountByTokenRepository } from '@data/use-cases/load-account-by-token/db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter, private readonly loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository) {}

  async load (token: string): Promise<Account> {
    const id = await this.decrypter.decrypt(token)
    if (id) {
      const account = await this.loadAccountByTokenRepositoryStub.loadByToken(token)
      return account && account
    }
    return null
  }
}
