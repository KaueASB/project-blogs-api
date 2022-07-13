const loginService = require('../services/loginService');

const loginController = {
  async login(req, res) {
    const data = await loginService.validateLogin(req.body);
    const user = await loginService.getUserByEmail(data);
    const token = await loginService.makeToken(user);
    res.status(200).json({ token });
  },
};

module.exports = loginController;