const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { throwNotFoundError, throwUserConflict, throwNotExists } = require('./utils');
const models = require('../database/models');

const { JWT_SECRET } = process.env;

const usersService = {
  async validateBody(body) {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
      image: Joi.string().required(),
    });

    const result = await schema.validateAsync(body);
    return result;
  },

  async getUserByEmail(email) {
    if (!email) return throwNotFoundError('Invalid fields');
    const user = await models.User.findOne({
      where: { email },
      raw: true,
    });
    if (user) return throwUserConflict('User already registered');
  },

  async addUser({ displayName, email, password, image }) {
    await models.User.create({
      displayName,
      email,
      password,
      image,
    });
  },

  async makeToken(user) {
    const payload = { payload: user };
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
  },

  async getAll() {
    const users = await models.User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },

  async getById(id) {
    const user = await models.User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
      raw: true,
    });

    if (!user) throwNotExists('User does not exist');
    return user;
  },
};

module.exports = usersService;