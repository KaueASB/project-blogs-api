const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const categoriesRoute = Router();

categoriesRoute.route('/')
  .post(tokenMiddleware, categoriesController.addCategory)
  .get(tokenMiddleware, categoriesController.getAll);

module.exports = categoriesRoute;