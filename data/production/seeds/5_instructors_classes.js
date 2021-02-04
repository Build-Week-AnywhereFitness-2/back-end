
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructors_classes').del()
};
