
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('actor').del()
    .then(function () {
      // Inserts seed entries
      return knex('actor').insert([
        {id: 1, name: 'Kemal Sunal'},
        {id: 2, name: 'Sener Sen'},
        {id: 3, name: 'Adile Nasit'}
      ]);
    });
};
