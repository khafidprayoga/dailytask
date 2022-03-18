/* eslint-disable camelcase */
const { PgLiteral } = require('node-pg-migrate');

exports.up = (pgm) => {
  pgm.createTable('tasks', {
    id: {
      type: 'UUID',
      notNull: true,
      primaryKey: true,
      default: new PgLiteral('uuid_generate_v4()'), // "using uuid-ossp module on postgres"
    },
    title: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    author: {
      type: 'INTEGER',
      notNull: true,
    },
    createdAt: {
      type: 'TIMESTAMP',
      notNull: true,
    },
  });

  //   Create FK from tasks.author to users.id
  pgm.addConstraint(
    'tasks',
    'fk_tasks.author__users.id',
    'FOREIGN KEY(author) REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('tasks', 'fk_tasks.author__users.id');
  pgm.dropTable('tasks');
};
