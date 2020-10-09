import { AccountModel, AddAccountParams, AddAccountRepository, AddAccount, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepository: AddAccountRepository

  constructor (hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
  }

  async add (params: AddAccountParams): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(params.password)
    await this.addAccountRepository.add({ ...params, password: hashedPassword })
    return Promise.resolve(null)
  }
}
