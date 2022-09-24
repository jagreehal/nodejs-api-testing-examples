import supertest from 'supertest';
import { expect, describe, it } from '@jest/globals';
import { app } from '../../app';

const api = supertest(app);

describe.only('GET /pokemon/:id', () => {
  it('should return 404 if id is not provided', async () => {
    const response = await api.get('/pokemon');
    expect(response.status).toBe(404);
  });

  it('should return bulbasaur', async () => {
    const response = await api.get('/pokemon/1');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ id: 1, name: 'mswasaur' }); // using msw
    // expect(response.body).toStrictEqual({ id: 1, name: 'bulbasaur' });
  });
});
