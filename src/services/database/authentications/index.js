const pool = require('../connection');
const InvariantError = require('../../../exceptions/InvariantError');

const AuthenticationsServices = {
  async addRefreshToken(refreshToken) {
    const sqlQuery = {
      text: 'INSERT INTO authentications VALUES ($1)',
      values: [refreshToken],
    };
    await pool.query(sqlQuery);
  },

  async verifyRefreshToken(refreshToken) {
    const sqlQuery = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [refreshToken],
    };
    const result = await pool.query(sqlQuery);
    if (!result.rowCount) throw new InvariantError('Refresh Token invalid!');
  },

  async deleteRefreshToken(refreshToken) {
    const sqlQuery = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [refreshToken],
    };
    await pool.query(sqlQuery);
  },
};

module.exports = AuthenticationsServices;
