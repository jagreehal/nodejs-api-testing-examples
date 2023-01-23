import express, { Express } from 'express';
import Redis from 'ioredis';

export type createAppProps = {
  redis: Redis;
};

export function createApp({ redis }: createAppProps) {
  const app: Express = express();

  app.get('/increment', async (request, reply) => {
    const value = await redis.incr('counter');
    reply.send({ counter: value });
  });

  return app;
}
