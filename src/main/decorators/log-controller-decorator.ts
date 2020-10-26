import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols'
import { LogErrorRepository } from '@data/protocols/local-storage/log-error-repository'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    const { body } = httpResponse
    httpResponse.statusCode === 500 && await this.logErrorRepository.logError(body.stack)
    return httpResponse
  }
}
