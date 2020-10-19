import { EmailValidatorAdapter } from './email-validator-adapter'
import { internet } from 'faker'
import validator from 'validator'

const email = internet.email()

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isEmail = sut.isEmail(email)
    expect(isEmail).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmail = sut.isEmail(email)
    expect(isEmail).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isEmail(email)
    expect(isEmailSpy).toHaveBeenCalledWith(email)
  })
})
