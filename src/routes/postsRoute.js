const { Router } = require('express');
const postsController = require('../controllers/postsController');

const tokenMiddleware = require('../middlewares/tokenMiddleware');

const postsRoute = Router();

postsRoute.use(tokenMiddleware);

postsRoute.route('/search')
  .get(postsController.search);

postsRoute.route('/:id')
  .delete(postsController.delete)
  .put(postsController.update)
  .get(postsController.getById);

postsRoute.route('/')
  .post(postsController.addPost)
  .get(postsController.getAll);

module.exports = postsRoute;