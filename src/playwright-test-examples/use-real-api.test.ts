import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

import { app } from '../app';

let apiServer;
const API_PORT = 7001; // todo: use random port

test.beforeAll(async () => {
  await new Promise<void>((resolve) => {
    apiServer = app.listen(API_PORT, () => {
      resolve();
    });
  });
});

test.afterAll(() => {
  apiServer.close();
});

test('should return 404 if id is not provided', async ({ request }) => {
  const response = await request.get(`http://localhost:${API_PORT}/pokemon`);
  expect(response.status()).toBe(404);
});

test('should return bulbasaur', async ({ request }) => {
  const response = await request.get(`http://localhost:${API_PORT}/pokemon/1`);
  const body = await response.json();
  expect(body).toStrictEqual({ id: 1, name: 'bulbasaur' });
});
