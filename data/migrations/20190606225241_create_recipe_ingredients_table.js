
exports.up = function(knex, Promise) {
 return knex.schema
    .createTable('recipe_ingredients', table => {
        table.increments()

        table
            .integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('recipes')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')

        table
            .integer('ingredient_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('ingredients')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')

        table
            .float('quantity')
            .notNullable()
        
        table
            .string('quantity_unit', 64)
            .notNullable()
            
    })


};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('recipe_ingredients')
};
