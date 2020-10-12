import { LogControllerDecorator } from './log-controller-decorator'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { internet } from 'faker'

const passwordFreeze = internet.password()
const mockHttpRequest: HttpRequest<any> = {
  body: {
    name: internet.userName(),
    email: internet.email(),
    password: passwordFreeze,
    confirmation: passwordFreeze
  }
}

const mockHttpResponse: HttpResponse<any> = {
  statusCode: 200,
  body: {
    name: internet.userName(),
    email: internet.email()
  }
}

describe('Log Controller Decorator', () => {
  test('Should call controller handle with correct value', async () => {
    class ControllerStub implements Controller {
      async handle (request: HttpRequest<any>): Promise<HttpResponse<any>> {
        const httpResponse = mockHttpResponse
        return Promise.resolve(httpResponse)
      }
    }
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = mockHttpRequest
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
