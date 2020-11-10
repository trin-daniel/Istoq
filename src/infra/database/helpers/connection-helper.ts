import knexfile from '@infra/database/helpers/knexfile'
import knex from 'knex'

class ConnectionHelper {
  private client: knex

  public async connect () {
    if (process.env.MODE === 'production') {
      this.client = knex(knexfile.production)
    }
    if (!process.env.MODE) {
      this.client = knex(knexfile.development)
    }
  }

  public async disconnect () {
    this.client && await this.client.destroy()
    this.client = null
  }

  async runQuery (sql: string, values?: Array<any>) {
    !this.client && await this.connect()
    const row = await this.client.raw(sql, values)
    return row
  }
}

export const SqlHelper = new ConnectionHelper()
