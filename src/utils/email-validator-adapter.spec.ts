import { EmailValidatorAdapter } from './email-validator-adapter'
import { internet } from 'faker'

const email = internet.email()

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isEmail = sut.isEmail(email)
    expect(isEmail).toBe(false)
  })
})
