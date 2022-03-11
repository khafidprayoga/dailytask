const RegisterValidations = require('../../validations/register');
const usersService = require('../../services/database/users');

const services = new usersService();

module.exports.registerControllers = {
  async postHandler(req, res, next) {
    try {
      await RegisterValidations.postValidate(req.body);
      const userId = await services.addUser(req.body);
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
