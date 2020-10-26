import { InvalidParamError } from '@presentation/errors'
import { CompareFieldsValidation } from '@validation/validators/compare-fields-validation'
import { random } from 'faker'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: random.word(), fieldToCompare: random.word() })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const wordFreezed = random.word()
    const error = sut.validate({ field: wordFreezed, fieldToCompare: wordFreezed })
    expect(error).toBeFalsy()
  })
})
