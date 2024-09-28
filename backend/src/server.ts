import fastify from 'fastify';
import AuthenticationRoutes from "./routes/authentication";
import CalculatorJunction from './routes/calculators';

const server = fastify(
  {
    logger: true,
  }
);


server.register(AuthenticationRoutes, { prefix: '/auth' });
server.register(CalculatorJunction, { prefix: '/calc' });



server.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await server.listen({ port: 8080 });
    console.log(`Server listening at http://localhost:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
