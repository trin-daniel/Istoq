import { EmailValidator } from '../../../presentation/protocols'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isEmail (email: string): boolean {
    return validator.isEmail(email)
  }
}
