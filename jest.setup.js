// eslint-disable-next-line @typescript-eslint/no-var-requires
const { server } = require('./src/mocks/server.js');
beforeAll(() =>
  server.listen({
    onUnhandledRequest: ({ method, url }) => {
      if (!url.pathname.startsWith('/pokemon')) {
        throw new Error(`Unhandled ${method} request to ${url}`);
      }
    },
  })
);
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
