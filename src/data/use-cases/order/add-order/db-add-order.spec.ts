import { DbAddOrder } from '@data/use-cases/order/add-order/db-add-order'
import { AddOrderRepository, orderParams, Order } from '@data/use-cases/order/add-order/db-add-order-protocols'
import { internet, random } from 'faker'

type SutTypes = {
  sut: DbAddOrder
  addOrderRepositoryStub: AddOrderRepository
}

const body = {
  account_id: random.uuid(),
  client: internet.userName(),
  product: random.word(),
  quantity: random.number().toString(),
  discount: random.number(100).toString(),
  price: random.float().toString()
}

const mockOrder: Order = Object.assign({}, body, { id: random.uuid(), created_at: new Date() })

const mockAddOrderRepository = (): AddOrderRepository => {
  class AddOrderRepositoryStub implements AddOrderRepository {
    async add (data: orderParams): Promise<Order> {
      return Promise.resolve(mockOrder)
    }
  }
  return new AddOrderRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addOrderRepositoryStub = mockAddOrderRepository()
  const sut = new DbAddOrder(addOrderRepositoryStub)
  return {
    sut,
    addOrderRepositoryStub
  }
}

describe('DbAddOrder Usecase', () => {
  test('Should call AddOrderRepository with correct values', async () => {
    const { sut, addOrderRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addOrderRepositoryStub, 'add')
    const data = body
    await sut.add(data)
    expect(addSpy).toHaveBeenCalledWith(data)
  })

  test('Should return new order on success', async () => {
    const { sut } = makeSut()
    const data = body
    const order = await sut.add(data)
    expect(order).toEqual(mockOrder)
  })

  test('Should throw if AddOrderRepository throws', async () => {
    const { sut, addOrderRepositoryStub } = makeSut()
    jest.spyOn(addOrderRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const data = body
    const promise = sut.add(data)
    await expect(promise).rejects.toThrow()
  })
})
