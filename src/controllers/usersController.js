const usersService = require('../services/usersService');

const usersController = {
  async addUser(req, res) {
    const data = await usersService.validateBody(req.body);
    await usersService.getUserByEmail(data.email);
    await usersService.addUser(data);
    const token = await usersService.makeToken(data);
    return res.status(201).json({ token });
  },
};

module.exports = usersController;