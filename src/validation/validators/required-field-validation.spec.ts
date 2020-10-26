import { MissingParamError } from '@presentation/errors'
import { RequiredFieldValidation } from '@validation/validators/required-field-validation'
import { internet, random } from 'faker'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('Required Field Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: internet.userName() })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: random.word() })
    expect(error).toBeFalsy()
  })
})
