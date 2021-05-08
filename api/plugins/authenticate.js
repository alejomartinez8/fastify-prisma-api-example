const fastifyPlugin = require('fastify-plugin');
const prisma = require('../db/prisma');

const authenticate = async (fastify) => {
  fastify.decorate('authenticate', (roles) => async (request, reply, done) => {
    try {
      const decoded = await request.jwtVerify();

      const userDB = await prisma.user.findUnique({
        where: { id: decoded.sub },
      });

      request.user = userDB;

      if (!roles.includes(userDB.role)) {
        reply.status(401).send({ error: 'Unauthorized - Role' });
      }

      done();
    } catch (err) {
      reply.send(err);
    }
  });
};

module.exports = fastifyPlugin(authenticate);
