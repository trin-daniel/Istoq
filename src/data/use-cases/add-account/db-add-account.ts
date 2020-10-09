import { AccountModel } from '../../../domain/models/account-model'
import { AddAccount, AddAccountParams } from '../../../domain/use-cases/add-account'
import { Hasher } from '../../protocols/hasher'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher

  constructor (hasher: Hasher) {
    this.hasher = hasher
  }

  async add (params: AddAccountParams): Promise<AccountModel> {
    await this.hasher.hash(params.password)
    return Promise.resolve(null)
  }
}
