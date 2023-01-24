import supertest from 'supertest';
import { expect, describe, it, afterEach } from '@jest/globals';
import { app } from './app';

import nock from 'nock';
import { Pokemon } from './pokemon';

const api = supertest(app);

describe('GET /pokemon/:id', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should return 404 if id is not provided', async () => {
    const response = await api.get('/pokemon');
    expect(response.status).toBe(404);
  });

  it('should return nockasaur', async () => {
    const pokemon: Pokemon = {
      id: 1,
      name: 'nockasaur',
    };
    nock('https://pokeapi.co').get('/api/v2/pokemon/1').reply(200, pokemon);

    const response = await api.get('/pokemon/1');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(pokemon);
  });
});
