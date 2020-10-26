import { Account } from '@domain/models/account'

export type AddAccountParams = {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add (params: AddAccountParams): Promise<Account>
}
