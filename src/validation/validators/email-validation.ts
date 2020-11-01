import { Validation } from '@presentation/protocols'
import { InvalidParamError } from '@presentation/errors'
import { EmailValidator } from '@validation/protocols/email-validator'

export class EmailValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly emailValidator: EmailValidator) {}

  validate (input: any): Error {
    const isEmail = this.emailValidator.isEmail(input[this.fieldName])
    if (!isEmail) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
