import { StatusCodes } from 'http-status-toolkit';

export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    reply.code(StatusCodes.OK);
    return {
      success: true,
      message: 'Server is running',
      support: fastify.someSupport(),
    };
  });
}
