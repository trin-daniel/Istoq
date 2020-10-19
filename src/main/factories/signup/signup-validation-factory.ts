import { Validation } from '../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'
import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../validation/validators'

export const makeSignUpValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'confirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'confirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
