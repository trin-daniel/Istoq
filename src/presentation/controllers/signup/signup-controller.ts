import { AddAccount, Authentication, Controller, HttpRequest, HttpResponse, Validation } from '@presentation/controllers/signup/signup-controller-protocols'
import { badRequest, serverError, ok, forbidden } from '@presentation/helpers/http/http-helpers'
import { EmailInUseError } from '@presentation/errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body)
      const { name, email, password } = request.body
      if (error) return badRequest(error)

      const account = await this.addAccount.add({ name, email, password })
      return !account
        ? forbidden(new EmailInUseError())
        : ok({ token: await this.authentication.auth({ email, password }) })
    } catch (error) {
      return serverError(error)
    }
  }
}
