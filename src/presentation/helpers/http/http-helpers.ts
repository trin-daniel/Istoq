import { ServerError } from '../../errors'
import { HttpResponse } from '../../protocols'

export const ok = (data: any): HttpResponse<any> => ({
  statusCode: 200,
  body: data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse<Error> => ({
  statusCode: 500,
  body: new ServerError()
})
