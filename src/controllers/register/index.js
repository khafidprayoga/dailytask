const RegisterValidations = require('../../validations/register');
const UsersServices = require('../../services/database/users');

const RegisterControllers = {
  async postHandler(req, res, next) {
    try {
      await RegisterValidations.postValidate(req.body);
      const userId = await UsersServices.addUser(req.body);
      const response = {
        status: 'success',
        message: 'Creating users, your account will be enable immediately!',
        data: {
          userId,
        },
      };
      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = RegisterControllers;
