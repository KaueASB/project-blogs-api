const { Router } = require('express');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const usersController = require('../controllers/usersController');

const usersRoute = Router();

usersRoute.route('/:id')
  .get(tokenMiddleware, usersController.getById);

usersRoute.route('/')
  .post(usersController.addUser)
  .get(tokenMiddleware, usersController.getAll);

module.exports = usersRoute;