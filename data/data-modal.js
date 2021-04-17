const db = require("./db-config");

function findActor() {
  return db("actor");
}

module.exports = {
  findActor,
  addActor,
  updateActor,
  findActorById,
  deleteActor

};

function addActor(newActor) {
  return db("actor")
    .insert(newActor, "id")
    .then(([id]) => {
      return db("actor").where({ id }).first();
    });
}

function updateActor(updatedActor, id) {
  return db("actor")
    .update(updatedActor)
    .where({ id })
    .then(updated => {
      if (updated) {
        return db("actor").where({ id }).first();
      }
    });
}

function findActorById(id) {
  return db("actor").where({ id }).first();
}

function deleteActor(id) {
  return db("actor").del().where({ id });
}
