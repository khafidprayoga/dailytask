const registerEndpoint = require('express').Router();
const { registerControllers } = require('../../controllers/register');

registerEndpoint.route('/').post(registerControllers.postHandler);
module.exports = registerEndpoint;
