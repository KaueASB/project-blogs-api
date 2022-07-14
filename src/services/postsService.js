const Joi = require('joi');
const Sequelize = require('sequelize');
const models = require('../database/models');

const { throwNotExists, throwNotFoundError } = require('./utils');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const postsService = {
  async validateBody(body) {
    try {
      const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        categoryIds: Joi.array().items(Joi.number().required()),
      });
      const result = await schema.validateAsync(body);
      return result;
    } catch (error) {
      throwNotFoundError('Some required fields are missing');
    }
  },

  async addPost({ title, content, categoryIds }, id) {
    const categoryExist = await Promise.all(
      categoryIds.map((ctgId) => models.Category.findOne({ where: { id: ctgId }, raw: true })),
    );
    if (!categoryExist.every((item) => item)) throwNotFoundError('"categoryIds" not found');

    const result = await sequelize.transaction(async (t) => {
      const post = await models.BlogPost.create({
        title,
        content,
        userId: id,
      }, { transaction: t });

      await Promise.all(categoryIds.map((ctgId) => (
        models.PostCategory.create({ postId: post.id, categoryId: ctgId }, { transaction: t })
      )));
      
      return post;
    });

    return result;
  },

  async getAll() {
    const posts = await models.BlogPost.findAll({ raw: true });
    return posts;
  },

  async getById(id) {
    const post = await models.User.findOne({ where: { id }, raw: true });

    if (!post) throwNotExists('Post does not exist');
    return post;
  },
};

module.exports = postsService;