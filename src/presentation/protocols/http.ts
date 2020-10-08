export type HttpResponse<R> = {
  statusCode: number
  body: R
}

export type HttpRequest<T> = {
  body?: T
}
