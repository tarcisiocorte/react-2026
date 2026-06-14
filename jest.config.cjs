module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!**/*.d.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^data/(.*)$': '<rootDir>/src/data/$1',
    '^domain/(.*)$': '<rootDir>/src/domain/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest']
  },
  transformIgnorePatterns: ['/node_modules/(?!@faker-js/faker/)']
}
