const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../controllers/user.controller');

const {
  validateUserCreate,
  validateUserUpdate,
} = require('../validators/user.validator');

module.exports = async (fastify, options) => {
  fastify.get('/', getAll);
  fastify.get('/:id', getById);
  fastify.post('/', validateUserCreate, create);
  fastify.put('/:id', validateUserUpdate, update);
  fastify.delete('/:id', remove);
};
