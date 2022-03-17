const taskEndpoint = require('express').Router();
const protectedResourceMiddleware = require('../../middlewares/protectedResource');
const TaskControllers = require('../../controllers/task');

taskEndpoint
  .route('/')
  .get([protectedResourceMiddleware, TaskControllers.getHandler]);

module.exports = taskEndpoint;
