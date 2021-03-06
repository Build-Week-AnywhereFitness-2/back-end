
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        { name: "Yoga 101", type: 2, start_time: "2021-29-01 22:19:18", duration_hour: 2, intensity_level: 1, location: "Reno, NV"},
        { name: "Crossfit 102", type: 3, start_time: "2021-20-02 22:19:18", duration_hour: 1.5, intensity_level: 3, location: "Carson City, NV"},
        { name: "Boxing with Mike Tyson", type: 1, start_time: "2021-13-03 22:19:18", duration_hour: 0.5, intensity_level: 4, location: "Lake Tahoe, NV"},
        { name: "Spincycle 101", type: 1, start_time: "2021-13-04 22:19:18", duration_hour: 1, intensity_level: 2, location: "Lake Tahoe, NV"}
      ]);
    });
};