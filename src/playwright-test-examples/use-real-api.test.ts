import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

test('should return 404 if id is not provided', async ({ request }) => {
  const response = await request.get(
    `http://localhost:${process.env.PORT}/pokemon`,
    {}
  );
  expect(response.status()).toBe(404);
});

test('should return bulbasaur', async ({ request }) => {
  const response = await request.get(
    `http://localhost:${process.env.PORT}/pokemon/1`,
    {}
  );
  const body = await response.json();
  expect(body).toStrictEqual({ id: 1, name: 'bulbasaur' });
});
