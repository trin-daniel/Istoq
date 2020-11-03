import { Validation } from '@presentation/protocols'
import { CurrencyValidation, DiscountValidation, QuantityValidation, RequiredFieldValidation, ValidationComposite } from '@validation/validators'

export const makeAddOrderValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['client', 'product', 'quantity', 'discount', 'price']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CurrencyValidation('price'))
  validations.push(new QuantityValidation('quantity'))
  validations.push(new DiscountValidation('discount'))
  return new ValidationComposite(validations)
}
