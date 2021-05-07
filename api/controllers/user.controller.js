const prisma = require('../db/prisma');

/**
 * Get All
 */
const getAll = async (request, reply) => {
  try {
    const users = await prisma.user.findMany();
    reply.send({ users });
  } catch (error) {
    reply.status(400).send({ error });
  }
};

/**
 * Create
 */
const create = async (request, reply) => {
  try {
    const user = await prisma.user.create({ data: request.body });
    reply.send(user);
  } catch (error) {
    reply.status(400).send({ error });
  }
};

/**
 * Get by Id
 */
const getById = async (request, reply) => {
  const { id } = request.params;

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    reply.send(user);
  } catch (error) {
    reply.status(400).send({ error });
  }
};

/**
 * Update by Id
 */
const update = async (request, reply) => {
  const { id } = request.params;

  try {
    const user = await prisma.user.update({
      where: { id },
      data: request.body,
    });
    reply.send({ msg: 'Updated', user });
  } catch (error) {
    reply.status(400).send({ error });
  }
};

/**
 * Delete by Id
 */
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

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
