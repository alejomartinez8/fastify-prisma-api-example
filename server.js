const fastify = require('fastify')({ logger: true });

const userController = require('./controllers/user.controller');

fastify.register(userController);

fastify.listen(4000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`server listening on ${address}`);
});
