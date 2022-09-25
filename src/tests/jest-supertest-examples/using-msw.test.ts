import supertest from 'supertest';
import { expect, describe, it, afterEach, beforeAll } from '@jest/globals';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const pokemon: Pokemon = {
  id: 1,
  name: 'mswasaur',
};

// set up handlers
export const handlers = [
  rest.get('https://pokeapi.co/api/v2/pokemon/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(pokemon));
  }),
];

// set up server
export const server = setupServer(...handlers);

import { app } from '../../app';
import { Pokemon } from '../../pokemon';

const api = supertest(app);

describe('GET /pokemon/:id', () => {
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

  it('should return 404 if id is not provided', async () => {
    const response = await api.get('/pokemon');
    expect(response.status).toBe(404);
  });

  it('should return mswasaur', async () => {
    const response = await api.get('/pokemon/1');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(pokemon);
  });
});
