const serverRouter = require('express').Router();
// Import all possible routes
const registerEndpoint = require('./register');

// Push server endpoint to Router
serverRouter.use('/register', registerEndpoint);

module.exports = serverRouter;
