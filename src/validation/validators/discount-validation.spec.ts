import { DiscountValidation } from '@validation/validators/discount-validation'
import { InvalidParamError } from '@presentation/errors'
import { random } from 'faker'

type SutTypes = {
  sut: DiscountValidation
}

const makeSut = (): SutTypes => {
  const sut = new DiscountValidation('discount')
  return {
    sut
  }
}

describe('Discount Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const { sut } = makeSut()
    const input = { discount: random.word() }
    const error = sut.validate(input)
    expect(error).toEqual(new InvalidParamError('discount'))
  })

  test('Should return null if validation succeeds', () => {
    const { sut } = makeSut()
    const input = { discount: random.number(100).toString() }
    const error = sut.validate(input)
    expect(error).toBeNull()
  })
})
