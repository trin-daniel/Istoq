import { Hasher } from '../../../data/protocols/hasher'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    return Promise.resolve(null)
  }
}
