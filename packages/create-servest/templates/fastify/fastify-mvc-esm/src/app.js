import cors from '@fastify/cors';
import fastify from 'fastify';
import { StatusCodes } from 'http-status-toolkit';
import { globalErrorHandler, notFoundHandler } from './handlers/errorHandler.js';

const app = fastify({
  logger: true,
});

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

export default app;
