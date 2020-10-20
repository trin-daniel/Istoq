import { LogRepository } from '../../../../infra/reports/log/log-repository'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logRepository = new LogRepository()
  return new LogControllerDecorator(controller, logRepository)
}
