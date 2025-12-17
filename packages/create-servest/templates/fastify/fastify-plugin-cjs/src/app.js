const path = require('path');
const AutoLoad = require('@fastify/autoload');
const cors = require('@fastify/cors');
const sensible = require('@fastify/sensible');
const { StatusCodes } = require('http-status-toolkit');

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Register plugins
  fastify.register(cors);
  fastify.register(sensible);

  // not found handler
  fastify.setNotFoundHandler((request, reply) => {
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
  fastify.setErrorHandler((error, request, reply) => {
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

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  });
};
