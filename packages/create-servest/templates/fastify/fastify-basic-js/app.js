const fastify = require('fastify');
const cors = require('@fastify/cors');

const app = fastify();

// cors
app.register(cors);

// home route
app.get('/', async (request, reply) => {
  return {
    success: true,
    message: 'Server is running',
  };
});

module.exports = app;
