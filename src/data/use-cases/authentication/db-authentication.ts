import { Authentication, AuthenticationParams } from '../../../domain/use-cases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/database/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (authentication: AuthenticationParams): Promise<string> {
    const { email } = authentication
    await this.loadAccountByEmailRepository.load(email)
    return null
  }
}
