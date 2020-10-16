import { makeSignInValidationFactory } from './signin-validation-factory'
import { ValidationComposite } from '../../../validation/validators/validation-composite'
import { RequiredFieldValidation } from '../../../validation/validators/required-field-validation'
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

describe('SignIn Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignInValidationFactory()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', mockEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
