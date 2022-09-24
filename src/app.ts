import express, { Express } from 'express';
import { getPokemonName, setPokemonName } from './pokemon';

export const app: Express = express();

app.get('/pokemon/:id', async (request, reply) => {
  const { id } = request.params;
  if (!id) {
    reply.status(400).send({ error: 'id is required' });
  }
  const pokemon = await getPokemonName(+id);
  if (!pokemon) {
    reply.status(404).send({ error: 'pokemon not found' });
  }
  reply.send(pokemon);
});

app.post('/pokemon/:id', async (request, reply) => {
  const { id } = request.params;
  if (!id) {
    reply.status(400).send({ error: 'id is required' });
  }

  const pokemon = await setPokemonName(+id, request.body?.name);

  reply.send(pokemon);
});

app.get('/', async (request, reply) => {
  return reply.send({ hello: 'world' });
});
