/* eslint-disable camelcase */

const pool = require('../services/database/connection');

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

    const result = await pool.query(sqlSyntax);
    if (result) {
      return result.rows[0];
    }
  },
  async deleteUser({ username }) {
    const sqlSyntax = {
      text: 'DELETE FROM users WHERE username = $1',
      values: [username],
    };
    await pool.query(sqlSyntax);
  },
};
