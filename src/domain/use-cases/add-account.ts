import { AccountModel } from '../models/account-model'

export type AddAccountParams = {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add (params: AddAccountParams): AccountModel
}
