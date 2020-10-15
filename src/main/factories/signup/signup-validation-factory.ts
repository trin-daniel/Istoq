import { Validation } from '../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { CompareFieldsValidation } from '../../../validation/validators/compare-fields-validation'
import { EmailValidation } from '../../../validation/validators/email-validation'
import { RequiredFieldValidation } from '../../../validation/validators/required-field-validation'
import { ValidationComposite } from '../../../validation/validators/validation-composite'

export const makeSignUpValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'confirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'confirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
