const TaskControllers = {
  async getHandler(req, res, next) {
    try {
      const data = {
        title: 'Baca Buku',
        describe: 'Python Crash Course',
        authorId: req.userId,
      };
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = TaskControllers;
