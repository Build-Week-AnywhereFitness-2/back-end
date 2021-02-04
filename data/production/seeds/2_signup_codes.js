
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('signup_codes').del()
    .then(function () {
      // Inserts seed entries
      return knex('signup_codes').insert([
        { code: "signup_1234!" },
        { code: "instructor!" },
      ]);
    });
};
