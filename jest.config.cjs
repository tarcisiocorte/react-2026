module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^data/(.*)$': '<rootDir>/src/data/$1',
    '^domain/(.*)$': '<rootDir>/src/domain/$1'
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['@swc/jest']
  }
}
