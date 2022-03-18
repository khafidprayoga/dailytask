require('dotenv').config();
const { Pool, types } = require('pg');

// set datetime type parser to work with moment
types.setTypeParser(1114, (value) => value);

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
});

module.exports = pool;
