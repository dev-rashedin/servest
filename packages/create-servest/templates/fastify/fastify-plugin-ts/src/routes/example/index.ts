import { FastifyPluginAsync } from 'fastify';

const example: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async function (_request, _reply) {
    return {
      success: true,
      message: 'This is an example route',
    };
  });
};

export default example;
