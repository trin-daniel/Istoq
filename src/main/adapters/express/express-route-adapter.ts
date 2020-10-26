import { Controller, HttpRequest } from '@presentation/protocols'
import { Request, Response } from 'express'

export const expressRouterAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299
      ? res.status(httpResponse.statusCode).json(httpResponse.body)
      : res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
  }
}
