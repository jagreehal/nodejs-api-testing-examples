import supertest from 'supertest';
import { expect, describe, it } from '@jest/globals';
import { createApp } from './app';

import Redis from 'ioredis-mock';

const redis = new Redis();
const app = createApp({ redis });
const api = supertest(app);

describe('Example injecting redis', () => {
  it('can increment counter', async () => {
    let response = await api.get('/increment');
    expect(response.body.counter).toStrictEqual(1);
    response = await api.get('/increment');
    expect(response.body.counter).toStrictEqual(2);
  });
});
