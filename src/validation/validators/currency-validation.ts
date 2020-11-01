import { Validation } from '@presentation/protocols'
import { InvalidParamError } from '@presentation/errors'

export class CurrencyValidation implements Validation {
  constructor (private readonly fieldName: string) {}
  validate (input: any): Error {
    const regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/
    return !regex.test(input[this.fieldName])
      ? new InvalidParamError(this.fieldName)
      : null
  }
}
