const prisma = require('../db/prisma');
const bcrypt = require('bcrypt');

const {
  validateUserLogin,
  validateUserCreate,
  validateUserUpdate,
} = require('../validators/user.validator');

module.exports = async (fastify, options) => {
  const login = async (request, reply) => {
    const { email, password } = request.body;

    try {
      const userDB = await prisma.user.findUnique({
        where: { email },
      });

      if (!userDB || !(await bcrypt.compare(password, userDB.password))) {
        reply.status(400).send({ error: 'Email or password incorrect' });
      }

      return reply.send({
        token: fastify.jwt.sign({ sub: userDB.id }, { expiresIn: '1d' }),
      });
    } catch (error) {
      console.log(error);
      reply.status(400).send({ error });
    }
  };

  const create = async (request, reply) => {
    try {
      const newUser = request.body;
      newUser.password = await bcrypt.hash(newUser.password, 12);
      const userDB = await prisma.user.create({ data: newUser });
      return userDB;
    } catch (error) {
      reply.status(400).send({ error });
    }
  };

  const getAll = async (request, reply) => {
    try {
      console.log('user', request.user);
      const users = await prisma.user.findMany();
      reply.send({ users });
    } catch (error) {
      reply.status(400).send({ error });
    }
  };

  const getById = async (request, reply) => {
    const { id } = request.params;

    try {
      const user = await prisma.user.findUnique({ where: { id } });
      reply.send(user);
    } catch (error) {
      reply.status(400).send({ error });
    }
  };

  const update = async (request, reply) => {
    const { id } = request.params;

    const newUser = request.body;

    if (newUser.password)
      newUser.password = await bcrypt.hash(newUser.password, 12);

    try {
      const user = await prisma.user.update({
        where: { id },
        data: newUser,
      });
      reply.send({ msg: 'Updated', user });
    } catch (error) {
      reply.status(400).send({ error });
    }
  };

  const remove = async (request, reply) => {
    const { id } = request.params;

    try {
      const user = await prisma.user.delete({
        where: { id },
      });
      reply.send({ msg: 'Deleted', user });
    } catch (error) {
      reply.status(400).send({ error });
    }
  };

  // Routes
  fastify.get(
    '/',
    {
      preValidation: [fastify.authenticate('ADMIN')],
    },
    getAll
  );
  fastify.get('/:id', getById);
  fastify.post('/login', validateUserLogin, login);
  fastify.post('/register', validateUserCreate, create);
  fastify.put(
    '/:id',
    { preValidation: [fastify.authenticate(['ADMIN'])], validateUserUpdate },
    update
  );
  fastify.delete(
    '/:id',
    { preValidation: [fastify.authenticate(['ADMIN'])] },
    remove
  );
};
