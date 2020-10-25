import { createPool, FieldPacket, OkPacket, Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise'

class ConnectionHelper {
  private client: Pool
  async connect (): Promise<void> {
    const db = this.client = createPool({
      host: '0.0.0.0',
      user: 'root',
      password: 'QXV9UG7L',
      port: 3306,
      database: process.env.DATABASE || 'test',
      queueLimit: 0,
      waitForConnections: true,
      connectionLimit: 10
    })
  }

  async disconnect (): Promise<void> {
    await this.client.end()
    this.client = null
  }

  async runQuery (sql: string, values?: Array<any>): Promise<[RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]]> {
    !this.client && await this.connect()
    const rowResult = await this.client.query(sql, values)
    return rowResult
  }
}

export const SqlHelper = new ConnectionHelper()
