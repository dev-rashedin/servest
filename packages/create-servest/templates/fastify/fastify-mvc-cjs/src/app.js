const fastify = require('fastify');
const cors = require('@fastify/cors');
const { StatusCodes } = require('http-status-toolkit');

const app = fastify({
  logger: true,
});

// cors
app.register(cors);

// home route
app.get('/', async (request, reply) => {
  reply.code(StatusCodes.OK).send({
    success: true,
    message: 'Server is running',
  });
});

module.exports = app;
