import { Validation } from '@presentation/protocols'
import { CurrencyValidation, DiscountValidation, QuantityValidation, RequiredFieldValidation, ValidationComposite } from '@validation/validators'
import { makeAddOrderValidationFactory } from '@main/factories/controllers/add-order/add-order-validation-factory'

jest.mock('@validation/validators/validation-composite')

describe('Add Order Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddOrderValidationFactory()
    const validations: Validation[] = []
    for (const field of ['client', 'product', 'quantity', 'discount', 'price']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CurrencyValidation('price'))
    validations.push(new QuantityValidation('quantity'))
    validations.push(new DiscountValidation('discount'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
