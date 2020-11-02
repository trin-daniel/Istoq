import { AddOrder, Controller, HttpRequest, HttpResponse, Validation } from '@presentation/controllers/add-order/add-order-controller-protocols'
import { badRequest, ok, serverError } from '@presentation/helpers/http/http-helpers'

export class AddOrderController implements Controller {
  constructor (private readonly validation: Validation, private readonly addOrder: AddOrder) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { account_id } = request
      const error = this.validation.validate(request.body)
      if (error) return badRequest(error)
      const order = await this.addOrder.add({ ...request.body, account_id })
      return ok(order)
    } catch (error) {
      return serverError(error)
    }
  }
}
