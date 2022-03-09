const InvariantError = require('../../../exceptions/InvariantError');
const { passwordManager } = require('../../../helpers/bcrypt');
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
  async addUser({ firstName, lastName, username, password, birthDate }) {
    await this._verifyUsername(username);
    const hashedPassword = await passwordManager.encode(password);

    const sqlSyantax = {
      text: `INSERT INTO users ("firstName", "lastName", username, password, "birthDate")
                    VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      values: [firstName, lastName, username, hashedPassword, birthDate],
    };

    const result = await this._pool.query(sqlSyantax);
    return result.rows[0].id;
  }
}

module.exports = usersService;
