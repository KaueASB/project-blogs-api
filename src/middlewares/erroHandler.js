const errors = {
  NotFoundError: 400,
  ValidationError: 400,
  UnauthorizedError: 401,
  JsonWebTokenError: 401,
  NotExists: 404,
  UserConflict: 409,
};

/**
 * @param {Error} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */

const erroHandler = ({ name, message }, _req, res, _next) => {
  const status = errors[name];
  if (name === 'JsonWebTokenError') {
    return res.status(status).json({ message: 'Expired or invalid token' });
  }
  if (!status) return res.status(500).json({ message });
  res.status(status).json({ message });
};

module.exports = erroHandler;