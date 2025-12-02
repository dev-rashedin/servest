import cors from '@fastify/cors';
import fastify from 'fastify';
import { StatusCodes } from 'http-status-toolkit';

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

export default app;
