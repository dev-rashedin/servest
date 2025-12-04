import { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async function (_request, _reply) {
    return {
      success: true,
      message: 'Server is running',
      support: fastify.someSupport(),
    };
  });
};

export default root;
