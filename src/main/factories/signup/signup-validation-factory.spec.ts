import { makeSignUpValidationFactory } from './signup-validation-factory'
import { ValidationComposite } from '../../../validation/validators/validation-composite'
import { RequiredFieldValidation } from '../../../validation/validators/required-field-validation'
import { CompareFieldsValidation } from '../../../validation/validators/compare-fields-validation'
import { EmailValidator, Validation } from '../../../presentation/protocols'
import { EmailValidation } from '../../../validation/validators/email-validation'

jest.mock('../../../validation/validators/validation-composite')

const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isEmail (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUp Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidationFactory()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'confirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'confirmation'))
    validations.push(new EmailValidation('email', mockEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
