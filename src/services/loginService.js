const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { throwUnauthorizedError, throwNotFoundError } = require('./utils');
const models = require('../database/models');

const FIELD_REQUIRED = 'Some required fields are missing';
const { JWT_SECRET } = process.env;

const loginService = {
  async validateToken(unknown) {
    const schema = Joi.string().required();
    try {
      const result = await schema.validateAsync(unknown);
      const [, token] = result.split(' ');
      return token;
    } catch (error) {
      throwUnauthorizedError();
    }
  },

  async validateLogin(body) {
    const schema = Joi.object({
      email: Joi.string().required().email().messages({ 
        'string-base': FIELD_REQUIRED,
        'string.empty': FIELD_REQUIRED,
        'string.email': FIELD_REQUIRED,
        'any.required': FIELD_REQUIRED,
      }),
      password: Joi.string().min(6).required().messages({
        'string-base': FIELD_REQUIRED,
        'string.empty': FIELD_REQUIRED,
        'string.min': FIELD_REQUIRED,
        'any.required': FIELD_REQUIRED,
      }),
    });

    const result = await schema.validateAsync(body);
    return result;
  },

  async getUserByEmail({ email, password }) {
    if (!email) return throwNotFoundError('Invalid fields');
    const user = await models.User.findOne({
      where: { email },
      raw: true,
    });
    if (!user || user.password !== password) return throwNotFoundError('Invalid fields');
    const { password: pass, ...restUser } = user;
    return restUser;
  },

  async makeToken(user) {
    const { id, name } = user;
    const payload = { data: { id, name } };
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
  },
};

module.exports = loginService;