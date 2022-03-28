module.exports = (Router, Controllers) => {
  const loginEndpoint = Router();

  loginEndpoint
    .route('/')
    .post(Controllers.postHandler)
    .put(Controllers.putHandler)
    .delete(Controllers.deleteHandler);

  return loginEndpoint;
};
