
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('class_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('class_types').insert([
        {id: 1, name: 'Misc'},
        {id: 2, name: 'Yoga'},
        {id: 3, name: 'Crossfit'}
      ]);
    });
};
