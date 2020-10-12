import { LogControllerDecorator } from './log-controller-decorator'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { internet } from 'faker'

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
}

type BodyParams = {
  name: string
  email: string
  password: string
  confirmation: string
}

const passwordFreeze = internet.password()
const mockHttpRequest: HttpRequest<BodyParams> = {
  body:
   {
     name: internet.userName(),
     email: internet.email(),
     password: passwordFreeze,
     confirmation: passwordFreeze
   }
}

const mockHttpResponse: HttpResponse<any | Error> = {
  statusCode: 200,
  body:
   {
     name: internet.userName(),
     email: internet.email()
   }
}

const mockController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (request: HttpRequest<any>): Promise<HttpResponse<any>> {
      const httpResponse = mockHttpResponse
      return Promise.resolve(httpResponse)
    }
  }
  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = mockController()
  const sut = new LogControllerDecorator(controllerStub)
  return { sut, controllerStub }
}

describe('Log Controller Decorator', () => {
  test('Should call controller handle with correct value', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = mockHttpRequest
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = mockHttpRequest
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(mockHttpResponse)
  })
})
