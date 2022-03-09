const { Pool } = require('pg');

const pool = new Pool(); // all db config genereated from envvars

module.exports = pool;
