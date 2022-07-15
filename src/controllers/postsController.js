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

  async getById(req, res) {
    const { id } = req.params;
    const posts = await postsService.getById(id);
    return res.status(200).json(posts);
  },

  async update(req, res) {
    const data = {
      idLogin: req.user.id,
      idPost: req.params.id,
      newContent: req.body,
    };
    await postsService.validateBodyUpdate(data.newContent);
    const post = await postsService.getById(data.idPost);
    const updatedPost = await postsService.update(data, post);
    return res.status(200).json(updatedPost);
  },

  async delete(req, res) {
    const data = { idLogin: req.user.id, idPost: req.params.id };
    const post = await postsService.getById(data.idPost);
    await postsService.delete(data, post);
    return res.send(204);
  },

  /** @type {import('express').RequestHandler} */

  async search(req, res) {
    const { q } = req.query;
    const result = await postsService.search(q);
    res.status(200).json(result);
  },
};

module.exports = postsController;