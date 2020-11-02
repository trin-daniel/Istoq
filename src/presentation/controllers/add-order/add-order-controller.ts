import { Controller, HttpRequest, HttpResponse, Validation } from '@presentation/controllers/add-order/add-order-controller-protocols'
import { badRequest } from '@presentation/helpers/http/http-helpers'

export class AddOrderController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request.body)
    if (error) return badRequest(error)
    return Promise.resolve(null)
  }
}
