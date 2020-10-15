import { Validation } from '../../../presentation/protocols'
import { CompareFieldsValidation } from '../../../validation/validators/compare-fields-validation'
import { RequiredFieldValidation } from '../../../validation/validators/required-field-validation'
import { ValidationComposite } from '../../../validation/validators/validation-composite'

export const makeSignUpValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'confirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'confirmation'))
  return new ValidationComposite(validations)
}
