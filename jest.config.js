module.exports = {
  verbose: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/src/__test__/',
    '<rootDir>/src/app.js',
  ],
  moduleNameMapper: {
    '@app': '<rootDir>/src/app.js',
    '@connections': '<rootDir>/src/services/database/connection.js',
    '@controllers/(.*)': '<rootDir>/src/controllers/$1',
    '@helpers/(.*)': '<rootDir>/src/__test__/$1',
    '@exceptions/(.*)': '<rootDir>/src/exceptions/$1',
    '@routes/(.*)': '<rootDir>/src/routes/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@validations/(.*)': '<rootDir>/src/validations/$1',
  },
};
