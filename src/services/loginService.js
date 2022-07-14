const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { throwUnauthorizedError, throwNotFoundError } = require('./utils');
const models = require('../database/models');

const FIELD_REQUIRED = 'Some required fields are missing';
const { JWT_SECRET } = process.env;

const loginService = {
  async validateToken(tokenHeader) {
    if (!tokenHeader) throwUnauthorizedError('Token not found');
    
    const schema = Joi.string().required();
    const result = await schema.validateAsync(tokenHeader);

    const [token] = result.split(' ');
    return token;
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
    const payload = { payload: user };
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
  },

  async verifyToken(token) {
    const { payload } = jwt.verify(token, JWT_SECRET);
    return payload;
  },
};

module.exports = loginService;