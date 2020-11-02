import { Controller, HttpRequest, HttpResponse, Validation } from '@presentation/controllers/add-order/add-order-controller-protocols'

export class AddOrderController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(request.body)
    return Promise.resolve(null)
  }
}
