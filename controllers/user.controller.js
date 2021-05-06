const prisma = require('../db/prisma');

async function routes(fastify, options) {
  fastify.get('/users', async (request, reply) => {
    try {
      const users = await prisma.user.findMany();
      reply.send({ users });
    } catch (error) {
      reply.send({ error });
    }
  });

  fastify.post(
    '/users',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            fistName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const user = await prisma.user.create({ data: request.body });
        reply.send(user);
      } catch (error) {
        reply.send({ error });
      }
    }
  );

  fastify.get('/users/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      const user = await prisma.user.findUnique({ where: { id } });
      reply.send(user);
    } catch (error) {
      reply.send({ error });
    }
  });

  fastify.put('/users/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      const user = await prisma.user.update({
        where: { id },
        data: request.body,
      });
      reply.send({ msg: 'Updated', user });
    } catch (error) {
      reply.send({ error });
    }
  });

  fastify.delete('/users/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      const user = await prisma.user.delete({
        where: { id },
      });
      reply.send({ msg: 'Deleted', user });
    } catch (error) {
      reply.send({ error });
    }
  });
}

module.exports = routes;
