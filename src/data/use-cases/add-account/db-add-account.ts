import { AccountModel } from '../../../domain/models/account-model'
import { AddAccount, AddAccountParams } from '../../../domain/use-cases/add-account'
import { AddAccountRepository } from '../../protocols/add-account-repository'
import { Hasher } from '../../protocols/hasher'

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
