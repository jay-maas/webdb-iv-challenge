
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ingredients').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        { name: 'Flour Tortillas' },
        { name: 'Carne Asada' },
        { name: 'Sour Cream' },
        { name: 'Jalepeno' },
        { name: 'Onion' },
        { name: 'Tomatoe' },
        { name: 'Lettuce' },
        { name: 'Queso Blanco' },
        { name: 'Avocado' },
        { name: 'Lime' },
        { name: 'Cilantro' }
      ]);
    });
};
