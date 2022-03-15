/* eslint-disable camelcase */

const pool = require('../services/database/connection');

const TestAuthentications = {
  async insertToken(token) {
    const sqlQuery = {
      text: 'INSERT INTO authentications VALUES ($1)',
      values: [token],
    };
    const result = await pool.query(sqlQuery);
    if (result.rowCount) return true;
  },

  async verifyToken(token) {
    const sqlQuery = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };
    const result = await pool.query(sqlQuery);
    if (result.rowCount) {
      return true;
    }
    return false;
  },

  async deleteToken(token) {
    const sqlQuery = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    };
    const result = await pool.query(sqlQuery);
    if (result) return true;
  },
};
module.exports = TestAuthentications;
