const throwUnauthorizedError = (message = 'Não autorizado') => {
  const err = new Error(message);
  err.name = 'UnauthorizedError';
  throw err;
};

const throwNotFoundError = (message) => {
  const err = new Error(message);
  err.name = 'NotFoundError';
  throw err;
};

const throwUserConflict = (message) => {
  const err = new Error(message);
  err.name = 'UserConflict';
  throw err;
};

module.exports = {
  throwUnauthorizedError,
  throwNotFoundError,
  throwUserConflict,
};