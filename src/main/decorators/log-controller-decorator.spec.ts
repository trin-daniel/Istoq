import { LogControllerDecorator } from './log-controller-decorator'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { internet } from 'faker'

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
}

const passwordFreeze = internet.password()
const mockHttpRequest: HttpRequest<any> = {
  body:
   {
     name: internet.userName(),
     email: internet.email(),
     password: passwordFreeze,
     confirmation: passwordFreeze
   }
}

const mockHttpResponse: HttpResponse<any> = {
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
})
