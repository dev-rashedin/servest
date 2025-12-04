import cors from '@fastify/cors';
import fastify from 'fastify';
import { StatusCodes } from 'http-status-toolkit';

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

export default app;
