/* eslint-disable camelcase */

const { Pool } = require('pg');
const _pool = new Pool();

module.exports.testUser = {
  async createNewUser({
    firstName = 'John',
    lastName = 'Doe',
    username = 'johndoe',
    password = 'iX64vNMa',
    birthDate = '2005-01-20',
  }) {
    const sqlSyntax = {
      text: `INSERT INTO users ("firstName", "lastName", username, password, "birthDate")
                    VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      values: [firstName, lastName, username, password, birthDate],
    };

    const result = await _pool.query(sqlSyntax);
    console.log(result);
    if (result) {
      return result.rows[0];
    }
  },
  async deleteUser({ username }) {
    await _pool.query(`DELETE FROM users WHERE username = ${username}`);
  },
};
