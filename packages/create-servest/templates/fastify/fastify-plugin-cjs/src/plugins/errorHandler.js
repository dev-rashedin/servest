const fp = require('fastify-plugin');
const { StatusCodes } = require('http-status-toolkit');

module.exports = fp(async (fastify, opts) => {
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
});
