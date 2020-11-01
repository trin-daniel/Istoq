import { InvalidParamError } from '@presentation/errors'
import { Validation } from '@presentation/protocols'

export class DiscountValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    const regex = /^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$/
    return !regex.test(input[this.fieldName])
      ? new InvalidParamError(this.fieldName)
      : null
  }
}
