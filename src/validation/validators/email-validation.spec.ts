import { InvalidParamError } from '../../presentation/errors'
import { EmailValidator } from '../../presentation/protocols'
import { EmailValidation } from './email-validation'
import { internet } from 'faker'

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isEmail (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub

  }
}

describe('Email Validation', () => {
  test('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isEmail').mockReturnValueOnce(false)
    const data = { email: internet.email() }
    const error = sut.validate(data)
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isEmailSpy = jest.spyOn(emailValidatorStub, 'isEmail')
    const data = { email: internet.email() }
    sut.validate(data)
    expect(isEmailSpy).toHaveBeenCalledWith(data.email)
  })

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isEmail').mockImplementationOnce(() => { throw new Error() })
    expect(sut.validate).toThrow()
  })
})
