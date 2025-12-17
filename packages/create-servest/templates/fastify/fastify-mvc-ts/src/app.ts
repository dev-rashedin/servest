import cors from '@fastify/cors';
import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-toolkit';

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
app.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
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
app.setErrorHandler((error, request: FastifyRequest, reply: FastifyReply) => {
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

export default app;
