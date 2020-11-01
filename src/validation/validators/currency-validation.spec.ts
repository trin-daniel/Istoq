import { InvalidParamError } from '@presentation/errors'
import { CurrencyValidation } from '@validation/validators/currency-validation'

type SutTypes = {
  sut: CurrencyValidation
}

const makeSut = (): SutTypes => {
  const sut = new CurrencyValidation('price')
  return {
    sut
  }
}

describe('Currency Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const { sut } = makeSut()
    const input = { price: '' }
    const error = sut.validate(input)
    expect(error).toEqual(new InvalidParamError('price'))
  })
})
