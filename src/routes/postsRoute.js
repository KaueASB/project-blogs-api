const { Router } = require('express');
const postsController = require('../controllers/postsController');

const tokenMiddleware = require('../middlewares/tokenMiddleware');

const postsRoute = Router();

postsRoute.route('/')
  .post(tokenMiddleware, postsController.addPost);

module.exports = postsRoute;