
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('movie').del()
    .then(function () {
      // Inserts seed entries
      return knex('movie').insert([
        {id: 1, name: 'Tosun Pasa'},
        {id: 2, name: 'Banker Bilo'},
        {id: 3, name: 'Neseli Gunler'}
      ]);
    });
};
