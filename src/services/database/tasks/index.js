const pool = require('../connection');
const moment = require('moment');
const NotFoundError = require('../../../exceptions/NotFoundError');

const TasksServices = {
  async createNewTask({ title, description, userId }) {
    const sqlQuery = {
      text: 'INSERT INTO tasks (title,description, author, "createdAt") VALUES ($1, $2, $3, $4) RETURNING id, "createdAt"',
      values: [
        title,
        description,
        userId,
        moment().format('YYYY-MM-DD HH:mm:ss'),
      ],
    };

    const result = await pool.query(sqlQuery);
    return result.rows[0];
  },
  async verifyTaskAvailability(taskId) {
    const sqlQuery = {
      text: 'SELECT FROM tasks WHERE id = $1',
      values: [taskId],
    };
    const result = await pool.query(sqlQuery);
    if (!result.rowCount) {
      throw new NotFoundError('Task not found!');
    }
  },
  async getDetailTaskById(taskId) {
    const sqlQuery = {
      text: `
            SELECT
                tasks.title,
                tasks.description,
                users.username author,
                tasks."createdAt"
            FROM tasks
                LEFT JOIN users
                ON tasks.author = users.id
            WHERE tasks.id = $1`,
      values: [taskId],
    };
    const result = await pool.query(sqlQuery);
    return result.rows[0];
  },
  async getAllTasks(userId) {
    const TODAY = moment().format('YYYY-MM-DD');

    const sqlQuery = {
      text: `
            SELECT
                tasks.id,
                tasks.title,
                users.username author,
                tasks."createdAt"
            FROM tasks
                LEFT JOIN users
                ON tasks.author = users.id
            WHERE tasks.author = $1 AND DATE(tasks."createdAt") = $2`,
      values: [userId, TODAY],
    };
    const result = await pool.query(sqlQuery);
    return result.rows;
  },
  async deleteTaskById(taskId) {
    const sqlQuery = {
      text: 'DELETE FROM tasks WHERE id = $1',
      values: [taskId],
    };

    await pool.query(sqlQuery);
  },
};

module.exports = TasksServices;
