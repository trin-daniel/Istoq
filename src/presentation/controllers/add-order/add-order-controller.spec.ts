import { AddOrderController } from '@presentation/controllers/add-order/add-order-controller'
import { HttpRequest, Validation } from '@presentation/controllers/add-order/add-order-controller-protocols'
import { badRequest } from '@presentation/helpers/http/http-helpers'
import { internet, random } from 'faker'

type SutTypes = {
  sut: AddOrderController
  validationStub: Validation
}

const mockRequest: HttpRequest = {
  account_id: random.uuid(),
  body: {
    client: internet.userName(),
    product: random.word(),
    quantity: random.number().toString(),
    discount: random.number(100).toString(),
    price: random.float().toString()
  }
}

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new AddOrderController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('Add Order Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = mockRequest
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const request = mockRequest
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new Error()))
  })
})
