import { AccountModel, AddAccountParams, AddAccountRepository, AddAccount, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepository: AddAccountRepository

  constructor (hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
  }

  async add (params: AddAccountParams): Promise<AccountModel> {
    const { name, email, password } = params
    const hash = await this.hasher.hash(password)
    const account = await this.addAccountRepository.add({
      name,
      email,
      password: hash
    })
    return account
  }
}
