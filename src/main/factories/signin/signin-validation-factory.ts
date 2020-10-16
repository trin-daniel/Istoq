import { Validation } from '../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { EmailValidation } from '../../../validation/validators/email-validation'
import { RequiredFieldValidation } from '../../../validation/validators/required-field-validation'
import { ValidationComposite } from '../../../validation/validators/validation-composite'

export const makeSignInValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
