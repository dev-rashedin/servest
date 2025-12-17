import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-toolkit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  // Place here your custom code!

  // Register plugins
  void fastify.register(cors);
  void fastify.register(sensible);

  // not found handler
  fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
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
  fastify.setErrorHandler((error, request: FastifyRequest, reply: FastifyReply) => {
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

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: opts,
  });
};

export default app;
