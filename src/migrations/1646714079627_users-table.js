/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    firstName: {
      type: 'VARCHAR(32)',
      notNull: true,
    },
    lastName: {
      type: 'VARCHAR(32)',
      notNull: true,
    },
    username: {
      type: 'VARCHAR(16)',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'VARCHAR(64)',
      notNull: true,
    },
    birthDate: {
      type: 'DATE',
      notNull: true,
    },
    createdAt: {
      type: 'DATE',
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
