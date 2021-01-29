
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        { name: "Yoga 101", type: 2, start_time: "2021-01-28T00:14:56Z", duration: "2 hours", intensity_level: 1, location: "Reno, NV"},
        { name: "Crossfit 102", type: 3, start_time: "2021-01-28T00:14:56Z", duration: "2 hours", intensity_level: 3, location: "Carson City, NV"},
        { name: "Boxing with Mike Tyson", type: 1, start_time: "2021-01-28T00:14:56Z", duration: "1.3 hours", intensity_level: 4, location: "Lake Tahoe, NV"},
      ]);
    });
};
