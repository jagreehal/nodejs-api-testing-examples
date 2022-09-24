// eslint-disable-next-line @typescript-eslint/no-var-requires
const { rest } = require('msw');
exports.handlers = [
  rest.get('https://pokeapi.co/api/v2/pokemon/1', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: 'mswasaur',
      })
    );
  }),
];
