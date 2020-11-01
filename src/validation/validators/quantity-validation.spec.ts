import { QuantityValidation } from '@validation/validators/quantity-validation'
import { InvalidParamError } from '@presentation/errors'
import { random } from 'faker'

type SutTypes = {
  sut: QuantityValidation
}

const makeSut = (): SutTypes => {
  const sut = new QuantityValidation('quantity')
  return {
    sut
  }
}

describe('Quantity Validation', () => {
  test('Should return a InvalidParamError if validation fails', async () => {
    const { sut } = makeSut()
    const input = { quantity: random.word() }
    const error = sut.validate(input)
    expect(error).toEqual(new InvalidParamError('quantity'))
  })

  test('Should return null if validation succeeds', async () => {
    const { sut } = makeSut()
    const input = { quantity: random.number().toString() }
    const error = sut.validate(input)
    expect(error).toBeNull()
  })
})
