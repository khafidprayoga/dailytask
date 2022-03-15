const loginEndpoint = require('express').Router();
const LoginControllers = require('../../controllers/login');

loginEndpoint
  .route('/')
  .post(LoginControllers.postHandler)
  .put(LoginControllers.putHandler)
  .delete(LoginControllers.deleteHandler);

module.exports = loginEndpoint;
