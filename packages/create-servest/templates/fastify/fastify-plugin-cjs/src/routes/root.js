const { StatusCodes } = require('http-status-toolkit');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return {
      success: true,
      message: 'Server is running',
      support: fastify.someSupport(),
    };
  });
};
