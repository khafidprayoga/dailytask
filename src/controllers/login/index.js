const LoginValidations = require('../../validations/login');
const TokenManager = require('../../utils/jwt');
const usersService = require('../../services/database/users');
const AuthenticationsServices = require('../../services/database/authentications');
const services = new usersService();
const authServices = new AuthenticationsServices();

const LoginControllers = {
  async postHandler(req, res, next) {
    try {
      await LoginValidations.postValidate(req.body);
      const { username, password } = req.body;
      const id = await services.verifyCredentials(username, password);

      const accessToken = await TokenManager.generateAccessToken({ id });
      const refreshToken = await TokenManager.generateRefreshToken({ id });

      await authServices.addRefreshToken(refreshToken);

      const response = {
        status: 'success',
        message: 'Session token created',
        data: {
          accessToken,
          refreshToken,
        },
      };
      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = LoginControllers;
