import { ValidationComposite } from './validation-composite'
import { MissingParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'
import { random } from 'faker'

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: random.word() })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
