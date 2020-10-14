export class UnauthorizedError extends Error {
  constructor () {
    super('unauthorized operation')
    this.name = 'UnauthorizedError'
  }
}
