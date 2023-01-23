module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/playwright-test-examples/',
  ],
};
