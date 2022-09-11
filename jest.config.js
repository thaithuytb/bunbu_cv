/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  scriptPreprocessor: './node_modules/babel-jest'
};