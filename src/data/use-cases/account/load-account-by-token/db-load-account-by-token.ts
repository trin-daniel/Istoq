import { Account, Decrypter, LoadAccountByToken, LoadAccountByTokenRepository } from '@data/use-cases/account/load-account-by-token/db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter, private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository) {}

  async load (token: string): Promise<Account> {
    const id = this.decrypter.decrypt(token)
    if (id) {
      const account = await this.loadAccountByTokenRepository.loadByToken(token)
      return account && account
    }
    return null
  }
}
