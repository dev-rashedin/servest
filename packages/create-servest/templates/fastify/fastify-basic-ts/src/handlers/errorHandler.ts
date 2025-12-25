import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-toolkit';

export const notFoundHandler = (request: FastifyRequest, reply: FastifyReply) => {
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
};

export const globalErrorHandler = (error: any, request: FastifyRequest, reply: FastifyReply) => {
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
};
