module.exports = (Router, protectedResource, Controllers) => {
  const taskEndpoint = Router();

  taskEndpoint
    .route('/')
    .post([protectedResource, Controllers.postTaskHandler])
    .get([protectedResource, Controllers.getAllTaskHandler]);

  taskEndpoint
    .route('/:taskId')
    .get([protectedResource, Controllers.getSpecifiedTaskHandler])
    .delete([protectedResource, Controllers.deleteSpecifiedTaskHandler]);

  return taskEndpoint;
};
