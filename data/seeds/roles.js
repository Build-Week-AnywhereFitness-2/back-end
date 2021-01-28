
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        { name: "Instructor" },
        { name: "Client" },
      ]);
    });
};
