const { Router } = require('express');
const usersController = require('../controllers/usersController');

const tokenMiddleware = require('../middlewares/tokenMiddleware');

const usersRoute = Router();

usersRoute.route('/')
  .post(usersController.addUser)
  .get(tokenMiddleware, usersController.getAll);

module.exports = usersRoute;