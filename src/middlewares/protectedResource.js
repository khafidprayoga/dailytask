/* eslint no-unused-vars: off */
const _ = require('lodash');
const TokenManager = require('../utils/jwt');
const InternalServerError = require('../exceptions/InternalServerError');
const AuthenticationError = require('../exceptions/AuthenticationError');

const protectedResourceMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [scheme, accessToken] = _.split(authorization, ' ');

    /* istanbul ignore if */
    if (!scheme) {
      throw new AuthenticationError('Please login first!');
    }

    if (_.toLower(scheme) !== 'bearer') {
      throw new InternalServerError('Server only support Bearer Auth Scheme');
    }

    const { id } = await TokenManager.verifyAccessToken(accessToken);
    req.userId = id;
    next(); // next to HTTP controllers
  } catch (error) {
    /* When JWT verify process error
     * Cause: signature invalid, token expired
     */
    next(error); // expect to exceptions middleware
  }
};

module.exports = protectedResourceMiddleware;
