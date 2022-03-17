const TaskValidations = require('../../validations/task');
const TasksServices = require('../../services/database/tasks');

const TaskControllers = {
  async postTaskHandler(req, res, next) {
    try {
      await TaskValidations.postValidate(req.body);
      const { title, description } = req.body;

      const taskData = {
        title,
        description,
        userId: req.userId,
      };

      const data = await TasksServices.createNewTask(taskData);

      const response = { status: 'success', message: 'New task added', data };
      await res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  },

  async getSpecifiedTaskHandler(req, res, next) {
    try {
      const { taskId } = req.params;
      await TasksServices.verifyTaskAvailability(taskId);
      await TaskValidations.getValidate({ taskId });

      const data = await TasksServices.getDetailTaskById(taskId);
      const response = {
        status: 'sucess',
        data,
      };
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  },

  async getAllTaskHandler(req, res, next) {
    try {
      const { userId } = req;
      const allTask = await TasksServices.getAllTasks(userId);

      const response = {
        status: 'success',
        data: {
          allTask,
        },
      };
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  },

  async deleteSpecifiedTaskHandler(req, res, next) {
    try {
      const { taskId } = req.params;
      await TasksServices.verifyTaskAvailability(taskId);
      await TaskValidations.deleteValidate({ taskId });

      await TasksServices.deleteTaskById(taskId);

      const response = {
        status: 'sucess',
        message: `task with id '${taskId}' deleted`,
      };

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = TaskControllers;
