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

const throwNotExists = (message) => {
  const err = new Error(message);
  err.name = 'NotExists';
  throw err;
};

module.exports = {
  throwUnauthorizedError,
  throwNotFoundError,
  throwUserConflict,
  throwNotExists,
};