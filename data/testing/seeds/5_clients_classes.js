
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clients_classes').del().truncate();
};