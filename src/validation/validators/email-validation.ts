import { InvalidParamError } from '../../presentation/errors'
import { EmailValidator, Validation } from '../../presentation/protocols'

export class EmailValidation implements Validation {
  private readonly fieldName: string
  private readonly emailValidator: EmailValidator
  constructor (fieldName: string, emailValidator: EmailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error {
    const isEmail = this.emailValidator.isEmail(input[this.fieldName])
    if (!isEmail) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
