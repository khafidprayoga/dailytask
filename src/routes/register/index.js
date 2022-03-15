const registerEndpoint = require('express').Router();
const RegisterControllers = require('../../controllers/register');

registerEndpoint.route('/').post(RegisterControllers.postHandler);
module.exports = registerEndpoint;
