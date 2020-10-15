import { Validation } from '../../../presentation/protocols'
import { RequiredFieldValidation } from '../../../validation/validators/required-field-validation'
import { ValidationComposite } from '../../../validation/validators/validation-composite'

export const makeSignUpValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'confirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
