
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        { name: "Yoga 101", start_time: "2021-01-28T00:14:56Z", duration: "2 hours", intensity_level: 1, location: "Reno, NV"},
        { name: "Crossfit 102", start_time: "2021-01-28T00:14:56Z", duration: "2 hours", intensity_level: 3, location: "Colorado, NV"},
      ]);
    });
};
