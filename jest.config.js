const { compilerOptions } = require('./tsconfig.json')
const resolve = require('ts-jest/utils')

module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-protocols.ts',
    '!<rootDir>/src/**/database/migrations/**',
    '!**/protocols/**'
  ],
  roots: ['<rootDir>/src'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: { '.+\\.ts$': 'ts-jest' },
  moduleNameMapper: resolve.pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' })
}
