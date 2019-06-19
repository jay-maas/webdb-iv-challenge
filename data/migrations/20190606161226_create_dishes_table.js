
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('dishes', table => {
        table.increments()

        table
            .string('name', 64)
            .notNullable()
            .unique()
        
        table
            .string('description', 256)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('dishes')
};
