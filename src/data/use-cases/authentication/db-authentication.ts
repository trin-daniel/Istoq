import { Authentication, AuthenticationParams } from '../../../domain/use-cases/authentication'
import { Encrypter } from '../../protocols/cryptography/encrypter'
import { HashComparer } from '../../protocols/cryptography/hash-Comparer'
import { LoadAccountByEmailRepository } from '../../protocols/database/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly encrypter: Encrypter
  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository, hashComparer: HashComparer, encrypter: Encrypter) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.encrypter = encrypter
  }

  async auth (authentication: AuthenticationParams): Promise<string> {
    const { email, password } = authentication
    const account = await this.loadAccountByEmailRepository.load(email)
    if (account) {
      await this.hashComparer.compare(password, account.password)
      await this.encrypter.encrypt(account.id)
    }
    return null
  }
}
