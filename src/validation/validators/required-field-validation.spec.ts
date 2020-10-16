import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'
import { internet } from 'faker'

describe('Required Field Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: internet.userName() })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
