import { Validation } from '@presentation/protocols'
import { InvalidParamError } from '@presentation/errors'

export class QuantityValidation implements Validation {
  constructor (private readonly fieldName: string) {}
  validate (input: any): Error {
    const regex = /^\d+$/
    return !regex.test(input[this.fieldName])
      ? new InvalidParamError(this.fieldName)
      : null
  }
}
