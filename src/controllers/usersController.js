const usersService = require('../services/usersService');

const usersController = {
  async addUser(req, res) {
    const data = await usersService.validateBody(req.body);
    await usersService.getUserByEmail(data.email);
    await usersService.addUser(data);
    const token = await usersService.makeToken(data);
    return res.status(201).json({ token });
  },

  async getAll(_req, res) {
    const users = await usersService.getAll();
    return res.status(200).json(users);
  },

  async getById(req, res) {
    const { id } = req.params;
    const users = await usersService.getById(id);
    return res.status(200).json(users);
  },

  async delete(req, res) {
    await usersService.delete(req.user.id);
    res.send(204);
  },
};

module.exports = usersController;