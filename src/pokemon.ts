import https from 'https';

export type Pokemon = {
  id: number;
  name: string;
};

const pokemonCache = new Map<number, Pokemon>();

export function setPokemonName(id, name?: string): Pokemon {
  if (!name) {
    throw new Error('name is required');
  }
  const pokemon = pokemonCache.get(id);
  if (!pokemon) {
    throw new Error(`Pokemon with id ${id} not found`);
  }
  const updatedPokemon = { ...pokemon, name };
  pokemonCache.set(id, updatedPokemon);
  return updatedPokemon;
}

export function getPokemonName(id: number): Promise<Pokemon | undefined> {
  return new Promise((resolve, reject) => {
    if (pokemonCache.has(id)) {
      return resolve(pokemonCache.get(id));
    }
    https
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const { name } = JSON.parse(data);
          const pokemon = { id, name };
          pokemonCache.set(id, pokemon);
          resolve(pokemon);
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}
