
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('recipes', table => {
        table.increments()

        table
            .string('name', 64)
            .notNullable()
            .unique()

        table
            .string('description', 256)
        
        table
            .string('instructions', 512)
            .notNullable()
            
        table
            .integer('dish_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('dishes')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('recipes')
};
