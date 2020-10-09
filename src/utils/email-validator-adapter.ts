import { EmailValidator } from '../presentation/protocols'

export class EmailValidatorAdapter implements EmailValidator {
  isEmail (email: string): boolean {
    return false
  }
}
