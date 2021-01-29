
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructors_classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructors_classes').insert([
        { user_id: 1, class_id: 1 }
      ]);
    });
};
