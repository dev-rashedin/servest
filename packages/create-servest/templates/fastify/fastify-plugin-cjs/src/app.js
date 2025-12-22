const path = require('path');
const AutoLoad = require('@fastify/autoload');
const cors = require('@fastify/cors');
const sensible = require('@fastify/sensible');

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Register plugins
  fastify.register(cors);
  fastify.register(sensible);

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  });
};
