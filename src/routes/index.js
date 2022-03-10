const { Router } = require('express');
const serverRouter = Router();
const registerEndpoint = require('./register');

serverRouter.use('/register', registerEndpoint);
module.exports = serverRouter;
