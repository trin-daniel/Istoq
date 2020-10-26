import 'module-alias/register'
import { app } from '@main/config/app'
import { SqlHelper } from '@infra/database/helpers/connection-helper'
import { config as dotenv } from 'dotenv'
dotenv()

SqlHelper.connect()
  .then(() => {
    app.listen(process.env.PORT, () => console.info(`Server running at http://localhost:${process.env.PORT}`))
  })
  .catch(console.error)
