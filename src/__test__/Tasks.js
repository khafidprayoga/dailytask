/* eslint-disable camelcase */

const pool = require('../services/database/connection');
const moment = require('moment');

const TestTasks = {
  async insertTask({
    title = 'Read Book',
    description = 'Node.js and Express.js for Javascript Backend ',
    author = 1,
  }) {
    const TODAY = moment().format('YYYY-MM-DD');

    const sqlQuery = {
      text: 'INSERT INTO tasks (title, description, author, "createdAt") VALUES ($1, $2, $3, $4) RETURNING id',
      values: [title, description, author, TODAY],
    };

    const result = await pool.query(sqlQuery);
    return result.rows[0].id;
  },
  async deleteTask(taskId) {
    const sqlQuery = {
      text: 'DELETE FROM tasks WHERE id = $1',
      values: [taskId],
    };

    const result = await pool.query(sqlQuery);
    if (result) return true;
  },
};

module.exports = TestTasks;
