const fastify = require('fastify');
const cors = require('@fastify/cors');
const { StatusCodes } = require('http-status-toolkit');

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
app.setNotFoundHandler((request, reply) => {
  reply.code(StatusCodes.NOT_FOUND);
  return {
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: request.url,
        message: 'API Not Found',
      },
    ],
  };
});

// global error handler
app.setErrorHandler((error, request, reply) => {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  reply.code(statusCode);
  return {
    success: false,
    message: error.message || 'Internal Server Error',
    errorMessages: [
      {
        path: request.url,
        message: error.message || 'Internal Server Error',
      },
    ],
  };
});

module.exports = app;
