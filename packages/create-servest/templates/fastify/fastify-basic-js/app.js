const fastify = require('fastify');
const cors = require('@fastify/cors');
const { StatusCodes } = require('http-status-toolkit');

const app = fastify();

// cors
app.register(cors);

// home route
app.get('/', async (request, reply) => {
  return {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Server is running',
  };
});

module.exports = app;
