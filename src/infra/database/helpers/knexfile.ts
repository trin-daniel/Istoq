import { existsSync, mkdirSync } from 'fs'
import path from 'path'

const sqlitePath = existsSync('../sqlite')
if (!sqlitePath) {
  mkdirSync('../sqlite')
}

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '..', 'sqlite', 'test.sqlite3')
    },
    migrations: {
      directory: path.resolve(__dirname, '..', 'migrations')
    },
    useNullAsDefault: true
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '..', 'sqlite', 'istoq.sqlite3')
    },
    migrations: {
      directory: path.resolve(__dirname, '..', 'migrations')
    },
    useNullAsDefault: true
  }
}
