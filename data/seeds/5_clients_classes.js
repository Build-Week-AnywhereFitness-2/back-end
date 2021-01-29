
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clients_classes').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('clients_classes').insert([
        { user_id: 2, class_id: 1 }
      ]);
    });
};
