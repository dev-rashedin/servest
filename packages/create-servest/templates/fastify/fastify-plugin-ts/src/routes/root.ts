import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-toolkit';

const root: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async function (_request: FastifyRequest, reply: FastifyReply) {
    reply.code(StatusCodes.OK);
    return {
      success: true,
      message: 'Server is running',
      support: fastify.someSupport(),
    };
  });
};

export default root;
