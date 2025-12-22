const fastify = require('fastify');
const cors = require('@fastify/cors');
const { StatusCodes } = require('http-status-toolkit');
const { notFoundHandler, globalErrorHandler } = require('./handlers/errorHandler');

const app = fastify({ logger: true });

// cors
app.register(cors);

// home route
app.get('/', async (request, reply) => {
  reply.code(StatusCodes.OK);
  return {
    success: true,
    message: 'Server is running',
  };
});

// not found handler
app.setNotFoundHandler(notFoundHandler);

// global error handler
app.setErrorHandler(globalErrorHandler);

module.exports = app;
