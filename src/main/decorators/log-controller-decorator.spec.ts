import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols'
import { serverError } from '@presentation/helpers/http/http-helpers'
import { LogErrorRepository } from '@data/protocols/local-storage/log-error-repository'
import { LogControllerDecorator } from '@main/decorators/log-controller-decorator'
import { internet } from 'faker'

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const passwordFreeze = internet.password()
const mockHttpRequest: HttpRequest = {
  body:
   {
     name: internet.userName(),
     email: internet.email(),
     password: passwordFreeze,
     confirmation: passwordFreeze
   }
}

const mockHttpResponse: HttpResponse = {
  statusCode: 200,
  body:
   {
     name: internet.userName(),
     email: internet.email()
   }
}

const mockController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (request: HttpRequest): Promise<HttpResponse> {
      const httpResponse = mockHttpResponse
      return Promise.resolve(httpResponse)
    }
  }
  return new ControllerStub()
}

const mockError = new Error()
mockError.stack = 'any_stack'

const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new LogErrorRepositoryStub()
}

const makeSut = (): SutTypes => {
  const logErrorRepositoryStub = mockLogErrorRepository()
  const controllerStub = mockController()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
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

  test('Should call LogErrorReport with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(serverError(mockError)))
    const httpRequest = mockHttpRequest
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith(mockError.stack)
  })
})
