import { Account, AddAccountParams, AddAccountRepository, AddAccount, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (params: AddAccountParams): Promise<Account> {
    const { name, email, password } = params
    const hash = await this.hasher.hash(password)
    const account = await this.addAccountRepository.add({ name, email, password: hash })
    return account
  }
}
