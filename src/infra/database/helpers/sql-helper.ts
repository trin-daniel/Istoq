import { createPool, Pool } from 'mysql2/promise'

export const SqlHelper = {
  client: null as Pool,
  async connect (): Promise<void> {
    this.client = createPool({
      host: '0.0.0.0',
      user: 'root',
      password: 'QXV9UG7L',
      port: 3306,
      database: process.env.DATABASE || 'test_istoq',
      queueLimit: 0,
      waitForConnections: true,
      connectionLimit: 10
    })
  },

  async disconnect (): Promise<void> {
    await this.client.end()
    this.client = null
  },

  async runQuery (sql: string, params?: Array<any>): Promise<any> {
    if (!this.client?.getConnection()) {
      await this.connect()
    }
    const sqlResult = await this.client.query(sql, params)
    return sqlResult
  }
}
