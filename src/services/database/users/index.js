const InvariantError = require('../../../exceptions/InvariantError');
const pool = require('../connection');

class usersService {
  constructor() {
    this._pool = pool;
  }
  async _verifyUsername(username) {
    const sqlQuery = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(sqlQuery);
    if (result.rowCount) {
      throw new InvariantError('username exist!');
    }
  }
  async deleteUser() {
    //TODO:
  }
}

module.exports = usersService;
