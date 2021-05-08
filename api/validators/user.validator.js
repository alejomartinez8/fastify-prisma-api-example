const validateUserLogin = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  },
};

const validateUserCreate = {
  schema: {
    body: {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'password', 'role'],
      properties: {
        fistName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string', enum: ['USER', 'ADMIN'] },
      },
    },
  },
};

const validateUserUpdate = {
  schema: {
    body: {
      type: 'object',
      properties: {
        fistName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string', enum: ['USER', 'ADMIN'] },
      },
    },
  },
};

module.exports = {
  validateUserLogin,
  validateUserCreate,
  validateUserUpdate,
};
