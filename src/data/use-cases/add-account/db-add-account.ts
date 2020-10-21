import { Account, AddAccountParams, AddAccountRepository, AddAccount, LoadAccountByEmailRepository, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailrepository: LoadAccountByEmailRepository
  ) {}

  async add (params: AddAccountParams): Promise<Account> {
    await this.loadAccountByEmailrepository.loadByEmail(params.email)
    const { name, email, password } = params
    const hash = await this.hasher.hash(password)
    const account = await this.addAccountRepository.add({ name, email, password: hash })
    return account
  }
}
