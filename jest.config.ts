/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

// const { pathsToModuleNameMapper } = require('ts-jest')
// const { compilerOptions } = require('./tsconfig')
// import { pathsToModuleNameMapper } from 'ts-jest'

export default {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  "moduleNameMapper": {
    "@/(.*)": "<rootDir>/src/$1"
  },
  preset: 'ts-jest',
  "globals": {
    "ts-jest": {
      diagnostics: { pathRegex: /\.(spec|test)\.js$/ },
      isolatedModules: true,
      tsconfig: 'tsconfig.json',
    }
  },
  "testEnvironment": "node",
};
