import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'
import { EmailValidator } from '../protocols/email-validator'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error {
    const isEmail = this.emailValidator.isEmail(input[this.fieldName])
    if (!isEmail) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
