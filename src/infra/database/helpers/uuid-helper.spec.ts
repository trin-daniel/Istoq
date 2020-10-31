import { UUIDHelper } from '@infra/database/helpers/uuid-helper'
import { random } from 'faker'
import uuid from 'uuid'

type SutTypes = {
  sut: UUIDHelper
}

const makeSut = (): SutTypes => {
  const sut = new UUIDHelper()
  return {
    sut
  }
}

jest.mock('uuid', () => {
  return {
    v4 (): string {
      return random.uuid()
    }
  }
})

describe('UUID Helper', () => {
  test('Should call uuid method v4', async () => {
    const { sut } = makeSut()
    const v4Spy = jest.spyOn(uuid, 'v4')
    sut.generate()
    expect(v4Spy).toHaveBeenCalled()
  })
})
