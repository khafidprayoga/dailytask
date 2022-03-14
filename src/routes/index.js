const serverRouter = require('express').Router();
// Import all possible routes
const registerEndpoint = require('./register');
const loginEndpoint = require('./login');

// Push server endpoint to Router
serverRouter.use('/register', registerEndpoint);
serverRouter.use('/login', loginEndpoint);

module.exports = serverRouter;
