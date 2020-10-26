import {LogRepository} from '@infra/reports/log/log-repository'
import fs from 'fs'

const makeSut = (): LogRepository =>{
  return new LogRepository()
}

describe('Log Repository', ()=>{
  beforeAll(async () =>{
    await fs.promises.rmdir(`${__dirname}/../../../../reports`, {recursive: true})
  })

  afterAll(async ()=>{
    await fs.promises.rmdir(`${__dirname}/../../../../reports/`, {recursive: true})
  })

  test('Should create report folder if no exist', async ()=>{
    const sut = makeSut()
    const mkdirSpy = jest.spyOn(fs.promises, 'mkdir')
    const error = 'any_error'
    await sut.logError(error)
    expect(mkdirSpy).toHaveBeenCalled()
  })

  test('Should create an error log on success', async ()=>{
    const sut = makeSut()
    const writeSpy = jest.spyOn(fs.promises, 'writeFile')
    const error = 'any_error'
    await sut.logError(error)
    const read = await fs.promises.readdir(`${__dirname}/../../../../reports/`)
    expect(writeSpy).toHaveBeenCalled()
    expect(read.length).toBe(1)
  })
})