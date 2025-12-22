import cors from '@fastify/cors';
import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-toolkit';
import { globalErrorHandler, notFoundHandler } from './handlers/errorHandler';

const app = fastify({
  logger: true,
});

// cors
app.register(cors);

// home route
app.get('/', async (_request: FastifyRequest, reply: FastifyReply) => {
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

export default app;
