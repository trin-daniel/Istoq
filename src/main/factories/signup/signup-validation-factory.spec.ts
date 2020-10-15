import { makeSignUpValidationFactory } from './signup-validation-factory'
import { ValidationComposite } from '../../../validation/validators/validation-composite'
import { RequiredFieldValidation } from '../../../validation/validators/required-field-validation'
import { Validation } from '../../../presentation/protocols'

jest.mock('../../../validation/validators/validation-composite')

describe('SignUp Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidationFactory()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'confirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
