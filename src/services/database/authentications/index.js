const pool = require('../connection');
const InvariantError = require('../../../exceptions/InvariantError');

class AuthenticationsServices {
  constructor() {
    this._pool = pool;
  }

  async addRefreshToken(refreshToken) {
    const sqlQuery = {
      text: 'INSERT INTO authentications VALUES ($1)',
      values: [refreshToken],
    };
    await this._pool.query(sqlQuery);
  }

  async verifyRefreshToken(refreshToken) {
    const sqlQuery = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [refreshToken],
    };
    const result = await this._pool.query(sqlQuery);
    if (!result.rowCount) throw new InvariantError('Refresh Token invalid!');
  }

  async deleteRefreshToken(refreshToken) {
    const sqlQuery = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [refreshToken],
    };
    await this._pool.query(sqlQuery);
  }
}

module.exports = AuthenticationsServices;
