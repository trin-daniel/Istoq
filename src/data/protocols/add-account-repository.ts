import { AccountModel } from '../../domain/models/account-model'
import { AddAccountParams } from '../../domain/use-cases/add-account'

export interface AddAccountRepository {
  add (params: AddAccountParams): Promise<AccountModel>
}
