const InvariantError = require('../../../exceptions/InvariantError');
const AuthenticationError = require('../../../exceptions/AuthenticationError');
const { passwordManager } = require('../../../utils/bcrypt');
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
      throw new InvariantError('username exist! try another...');
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
  async verifyCredentials(username, password) {
    const sqlQuery = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(sqlQuery);
    if (!result.rowCount) {
      throw new AuthenticationError('invalid username or password');
    }
    const { id, password: hashedPassword } = result.rows[0];
    const match = await passwordManager.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('invalid username or password');
    }
    return id;
  }
}

module.exports = usersService;
