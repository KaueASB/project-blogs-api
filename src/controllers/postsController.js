const postsService = require('../services/postsService');

const postsController = {
  async addPost(req, res) {
    const { id } = req.user;
    await postsService.validateBody(req.body);
    const post = await postsService.addPost(req.body, id);
    res.status(201).json(post);
  },

  async getAll(_req, res) {
    const posts = await postsService.getAll();
    return res.status(200).json(posts);
  },
};

module.exports = postsController;