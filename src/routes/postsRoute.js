const { Router } = require('express');
const postsController = require('../controllers/postsController');

const tokenMiddleware = require('../middlewares/tokenMiddleware');

const postsRoute = Router();

postsRoute.use(tokenMiddleware);

postsRoute.route('/')
  .post(postsController.addPost)
  .get(postsController.getAll);

module.exports = postsRoute;