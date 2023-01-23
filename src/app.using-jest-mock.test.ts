import supertest from 'supertest';
import { expect, jest, it, describe } from '@jest/globals';
import { Pokemon } from './pokemon';

const getPokemonName = jest.fn();
jest.mock('./pokemon', () => {
  const original: any = jest.requireActual('./pokemon');
  original.getPokemonName = getPokemonName;
  return original;
});

// has to be after mock
import { app } from './app';
const api = supertest(app);

describe('GET /pokemon/:id', () => {
  it('should return 404 if id is not provided', async () => {
    const response = await api.get('/pokemon');
    expect(response.status).toBe(404);
  });

  it('should return Mockasaur using mock', async () => {
    const pokemon: Pokemon = {
      id: 1,
      name: 'Mockasaur',
    };
    getPokemonName.mockImplementationOnce(() => Promise.resolve(pokemon));

    const response = await api.get('/pokemon/1');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(pokemon);
  });
});
