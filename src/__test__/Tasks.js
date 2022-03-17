/* eslint-disable camelcase */

const pool = require('../services/database/connection');

const TestTasks = {
  async insertTask({
    title = 'Read Book',
    description = 'Node.js and Express.js for Javascript Backend ',
    author = 1,
  }) {
    const sqlQuery = {
      text: 'INSERT INTO tasks (title, description, author) VALUES ($1, $2, $3) RETURNING id',
      values: [title, description, author],
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
