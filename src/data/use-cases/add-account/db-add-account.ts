import { Account, AddAccountParams, AddAccountRepository, AddAccount, LoadAccountByEmailRepository, Hasher } from '@data/use-cases/add-account/db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher, private readonly addAccountRepository: AddAccountRepository, private readonly loadAccountByEmailrepository: LoadAccountByEmailRepository) {}

  async add (params: AddAccountParams): Promise<Account> {
    const isAccount = await this.loadAccountByEmailrepository.loadByEmail(params.email)
    if (!isAccount) {
      const { name, email, password } = params
      const hash = await this.hasher.hash(password)
      const account = await this.addAccountRepository.add({ name, email, password: hash })
      return account
    }
    return null
  }
}
