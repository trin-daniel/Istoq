import { Authentication, AuthenticationParams, Encrypter, HashComparer, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@data/use-cases/authentication/db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository, private readonly hashComparer: HashComparer, private readonly encrypter: Encrypter, private readonly updateAccessTokenRepository: UpdateAccessTokenRepository) {}

  async auth (authentication: AuthenticationParams): Promise<string> {
    const { email, password } = authentication
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (account) {
      const isTrue = await this.hashComparer.compare(password, account.password)
      if (isTrue) {
        const token = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, token)
        return token
      }
    }
    return null
  }
}
