import { Encrypter } from '@data/protocols/cryptography/encrypter'
import { Decrypter } from '@data/protocols/cryptography/decrypter'
import { sign, verify } from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  encrypt (value: string): string {
    const token = sign({ id: value }, this.secret, { expiresIn: '1d' })
    return token
  }

  decrypt (token: string): string {
    const id = verify(token, this.secret)
    return id.toString()
  }
}
