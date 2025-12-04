import cors from '@fastify/cors';
import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-toolkit';

const app = fastify({
  logger: true,
});

// cors
app.register(cors);

// home route
app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  reply.code(StatusCodes.OK).send({
    success: true,
    message: 'Server is running',
  });
});

export default app;
