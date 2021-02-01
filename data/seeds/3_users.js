
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: "rick", password: "$2a$08$VFuROSk/DPwkgnopu2Sj5OA1GNeUoR2GVAZ2qeSt08GFJrRwKDXiG", full_name: "Rick Smith", role: 2, signup_code: 1 },
        { username: "morty", password: "$2a$08$7RCrVhnHvI5AbKTnbNyYQ.YapAj8ypTSbeODZA01WT3agQWd/YpfC", full_name: "Morty Smith", role: 1 }
      ]);
    });
};
