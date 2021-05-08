require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const fasfityJwt = require('fastify-jwt');

const userRoutes = require('./api/controllers/user.controller');

fastify.register(fasfityJwt, { secret: process.env.JWT_SECRET });
fastify.register(require('./api/plugins/authenticate'));
fastify.register(userRoutes, { prefix: '/users' });

fastify
  .listen(4000)
  .then((address) => console.log(`server listening on ${address}`))
  .catch((err) => {
    console.log('Error starting server:', err);
    process.exit(1);
  });

module.exports = fastify;
