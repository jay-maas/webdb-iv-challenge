
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipe_ingredients').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipe_ingredients').insert([
        { recipe_id: 1, ingredient_id: 1, quantity: 1, quantity_unit: 'count'},
        { recipe_id: 1, ingredient_id: 2, quantity: 0.5, quantity_unit: 'cup'},
        { recipe_id: 1, ingredient_id: 3, quantity: 1, quantity_unit: 'dollop'},
        { recipe_id: 1, ingredient_id: 4, quantity: 1, quantity_unit: 'diced teaspoon'},
        { recipe_id: 1, ingredient_id: 5, quantity: 1, quantity_unit: 'diced tablespoon'},
        { recipe_id: 1, ingredient_id: 6, quantity: 1, quantity_unit: 'diced tablespoon'},
        { recipe_id: 1, ingredient_id: 7, quantity: 0.5, quantity_unit: 'shredded cup'},
        { recipe_id: 1, ingredient_id: 8, quantity: 0.5, quantity_unit: 'shredded cup'},
        { recipe_id: 1, ingredient_id: 9, quantity: 1, quantity_unit: 'diced teaspoon'},
        { recipe_id: 1, ingredient_id: 10, quantity: .25, quantity_unit: 'slice'},
        { recipe_id: 1, ingredient_id: 11, quantity: 1, quantity_unit: 'finely chopped teaspoon'}
      ]);
    });
};
