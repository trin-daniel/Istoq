import { AddOrderController } from '@presentation/controllers/add-order/add-order-controller'
import { AddOrder, HttpRequest, orderParams, Order, Validation } from '@presentation/controllers/add-order/add-order-controller-protocols'
import { badRequest } from '@presentation/helpers/http/http-helpers'
import { internet, random } from 'faker'

type SutTypes = {
  sut: AddOrderController
  validationStub: Validation
  addOrderStub: AddOrder
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

const mockOrder: Order = {
  id: random.uuid(),
  account_id: mockRequest.account_id,
  ...mockRequest.body,
  created_at: new Date()
}

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const mockAddOrder = (): AddOrder => {
  class AddOrderStub implements AddOrder {
    async add (data: orderParams): Promise<Order> {
      return Promise.resolve(mockOrder)
    }
  }
  return new AddOrderStub()
}

const makeSut = (): SutTypes => {
  const addOrderStub = mockAddOrder()
  const validationStub = mockValidation()
  const sut = new AddOrderController(validationStub, addOrderStub)
  return {
    sut,
    validationStub,
    addOrderStub
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

  test('Should call AddOrder with correct values', async () => {
    const { sut, addOrderStub } = makeSut()
    const addSpy = jest.spyOn(addOrderStub, 'add')
    const request = mockRequest
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith({ ...request.body, account_id: request.account_id })
  })
})
