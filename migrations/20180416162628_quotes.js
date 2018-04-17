exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('quotes', function(table) {
      table.increments('id').primary();
      table.string('quote', 3000);
      table.string('author');
      table.dateTime('created');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('quotes'),
  ]);
};
