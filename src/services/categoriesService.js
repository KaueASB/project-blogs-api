const Joi = require('joi');

const models = require('../database/models');

const categoriesService = {
  async validateBody(body) {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const result = await schema.validateAsync(body);
    return result;
  },

  async addCategory({ name }) {
    const category = await models.Category.create({ name, raw: true });
    return category;
  },

};

module.exports = categoriesService;