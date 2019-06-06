
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        { 
          dish_id: 1,
          name: 'Soft Tacos', 
          description: 'Delicious flour tacos with carne asada and all the fixings.', 
          instructions: 'Prepare carne asada. Cook to perfection. Shred lettuce, dice tomatoes, avocado, onions, jalepenos and cilantro. Grate cheese. Prepare sour cream and hot sauces. Slice limes into quarters. Toast flour tortillas over open flame. Spread sour cream on the inside of the tortilla. Sprinkle cheese evenly. Place portion of carne asada in the middle of the tortilla from end to end. Top with desired toppings. Squeeze lime over top. Fold in half. Enjoy!'
        },
      ]);
    });
};
