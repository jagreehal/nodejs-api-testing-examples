module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/tests/supertest-examples/*.test.ts'],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
