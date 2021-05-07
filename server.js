const fastify = require('fastify')({ logger: true });

const userRoutes = require('./api/routes/user.routes');

fastify.register(userRoutes, { prefix: '/users' });

fastify
  .listen(4000)
  .then((address) => console.log(`server listening on ${address}`))
  .catch((err) => {
    console.log('Error starting server:', err);
    process.exit(1);
  });
