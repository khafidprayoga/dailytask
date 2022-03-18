const taskEndpoint = require('express').Router();
const protectedResourceMiddleware = require('../../middlewares/protectedResource');
const TaskControllers = require('../../controllers/task');

taskEndpoint
  .route('/')
  .post([protectedResourceMiddleware, TaskControllers.postTaskHandler])
  .get([protectedResourceMiddleware, TaskControllers.getAllTaskHandler]);

taskEndpoint
  .route('/:taskId')
  .get([protectedResourceMiddleware, TaskControllers.getSpecifiedTaskHandler])
  .delete([
    protectedResourceMiddleware,
    TaskControllers.deleteSpecifiedTaskHandler,
  ]);

module.exports = taskEndpoint;
