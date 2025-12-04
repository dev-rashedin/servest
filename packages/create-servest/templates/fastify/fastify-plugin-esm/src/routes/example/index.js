export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return {
      success: true,
      message: 'This is an example route',
    };
  });
}
