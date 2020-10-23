import { Account } from '../../../../domain/models/account'
import { AddAccountParams } from '../../../../domain/use-cases/account/add-account'

export interface AddAccountRepository {
  add (params: AddAccountParams): Promise<Account>
}
