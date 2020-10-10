import { createPool } from 'mysql2/promise'

export const SqlHelper = createPool({
  host: '0.0.0.0',
  user: 'root',
  password: 'QXV9UG7L',
  port: 3306,
  database: process.env.DATABASE || 'test_istoq',
  queueLimit: 0,
  waitForConnections: true,
  connectionLimit: 10
})
