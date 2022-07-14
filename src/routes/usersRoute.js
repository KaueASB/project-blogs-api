const { Router } = require('express');
const usersController = require('../controllers/usersController');

const usersRoute = Router();

usersRoute.post('/', usersController.addUser);

module.exports = usersRoute;