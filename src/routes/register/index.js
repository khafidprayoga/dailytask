module.exports = (Router, Controllers) => {
  const registerEndpoint = Router();

  registerEndpoint.route('/').post(Controllers.postHandler);

  return registerEndpoint;
};
