const loginEndpoint = require('express').Router();
const LoginControllers = require('../../controllers/login');

loginEndpoint.route('/').post(LoginControllers.postHandler).put().delete();

module.exports = loginEndpoint;
