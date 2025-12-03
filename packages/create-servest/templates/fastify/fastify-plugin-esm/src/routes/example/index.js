export default async function (fastify, opts) {
  fastify.get('/example', async function (request, reply) {
    return {
      success: true,
      message: 'This is an example route',
    };
  });
}
