
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: "john", password: "john1234", full_name: "John Smith", role: 1, signup_code: 1 },
        { username: "bob", password: "bob1234", full_name: "Bob Rob", role: 2 }
      ]);
    });
};
