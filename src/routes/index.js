const { Router } = require('express');
const routerV1 = Router();

/* Import middleware  */
const protectedResource = require('../middlewares/protectedResource');

/* Import All Controllers */
const API_DOCS_V1 = require('../controllers');
const LoginControllers = require('../controllers/login');
const RegisterControllers = require('../controllers/register');
const TaskControllers = require('../controllers/task');

/* Import all endpoint and create dependency tree */
const registerEndpoint = require('./register')(Router, RegisterControllers);
const loginEndpoint = require('./login')(Router, LoginControllers);
const taskEndpoint = require('./task')(
  Router,
  protectedResource,
  TaskControllers
);

/* Push server endpoint to Router */
routerV1.all('/', API_DOCS_V1);
routerV1.use('/register', registerEndpoint);
routerV1.use('/login', loginEndpoint);
routerV1.use('/task', taskEndpoint);

module.exports = { routerV1 };
