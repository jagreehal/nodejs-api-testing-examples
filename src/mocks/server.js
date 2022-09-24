// import { setupServer } from 'msw/node';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { setupServer } = require('msw/node');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { handlers } = require('./handlers');
// import { handlers } from './handlers';
// This configures a request mocking server with the given request handlers.
exports.server = setupServer(...handlers);
