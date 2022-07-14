const categoriesService = require('../services/categoriesService');

const categoriesController = {
  async addCategory(req, res) {
    await categoriesService.validateBody(req.body);
    const category = await categoriesService.addCategory(req.body);
    res.status(201).json(category);
  },
};

module.exports = categoriesController;