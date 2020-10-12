import { SqlHelper } from '../infra/database/helpers/sql-helper'
import { app } from './config/app'
import { config as dotenv } from 'dotenv'
dotenv()

SqlHelper.connect()
  .then(() => {
    app.listen(process.env.PORT, () => console.info(`Server running at http://localhost:${process.env.PORT}`))
  })
  .catch(console.error)
