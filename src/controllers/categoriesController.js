const categoriesService = require('../services/categoriesService');

const categoriesController = {
  async addCategory(req, res) {
    await categoriesService.validateBody(req.body);
    const category = await categoriesService.addCategory(req.body);
    res.status(201).json(category);
  },
  async getAll(_req, res) {
    const categories = await categoriesService.getAll();
    return res.status(200).json(categories);
  },
};

module.exports = categoriesController;