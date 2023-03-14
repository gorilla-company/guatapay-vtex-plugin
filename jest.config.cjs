module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'dist/config', 'dist/tests', 'dist/app.js'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  modulePathIgnorePatterns: ['dist'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  transform: { '\\.ts$': ['ts-jest'] },
};
