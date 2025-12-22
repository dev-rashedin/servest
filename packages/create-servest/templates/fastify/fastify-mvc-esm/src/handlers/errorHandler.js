import { StatusCodes } from 'http-status-toolkit';

export const notFoundHandler = (request, reply) => {
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

export const globalErrorHandler = (error, request, reply) => {
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
