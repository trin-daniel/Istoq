import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    await this.controller.handle(httpRequest)
    return Promise.resolve(null)
  }
}
