import { LogErrorRepository } from '../../../data/protocols/log-error-repository'
import { promises, existsSync } from 'fs'

export class LogRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const dir = `${__dirname}/../../../../reports/`
    const filename =`${dir}${new Date()}-server-error.txt`
    const data = {
      error: stack,
      date: new Date()
    }
    if (!existsSync(dir)) {
      await promises.mkdir(`${__dirname}/../../../../reports`)
    }
    await promises.writeFile(filename, JSON.stringify(data), {encoding: "utf-8"})
}
}
