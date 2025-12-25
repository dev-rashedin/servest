const fastify = require('fastify');
const app = require('./app');

const server = fastify({
  logger: true,
});

server.register(app);

const start = async () => {
  try {
    await server.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
