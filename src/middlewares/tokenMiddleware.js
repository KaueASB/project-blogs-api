const loginService = require('../services/loginService');

/** @type {import('express').RequestHandler} */

const tokenMiddleware = async (req, _res, next) => {
  const token = req.headers.authorization;
  const isValid = await loginService.validateToken(token);
  const user = await loginService.verifyToken(isValid);
  req.user = user;
  next();
};

module.exports = tokenMiddleware;