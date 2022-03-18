const serverRouter = require('express').Router();
// Import all possible routes
const registerEndpoint = require('./register');
const loginEndpoint = require('./login');
const taskEndpoint = require('./task');

// Push server endpoint to Router
serverRouter.use('/register', registerEndpoint);
serverRouter.use('/login', loginEndpoint);
serverRouter.use('/task', taskEndpoint);

module.exports = serverRouter;
