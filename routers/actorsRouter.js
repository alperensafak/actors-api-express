const router = require("express").Router();
const Actor = require("../data/data-modal");

router.get("/", (req, res) => {
  Actor.findActor()
    .then(actors => {
      res.status(200).json(actors);
    })
    .catch(error => {
      next({
        status: 500,
        errorMessage: "when actors got, it could be error",
        error,
      });
    });
});

router.post("/", (req, res, next) => {
  const newActor = req.body;

  if (!newActor.name) {
    next({
      statusCode: 400,
      errorMessage: "Please enter a actor name",
    });
  } else {
    Actor.addActor(newActor)
      .then(added => {
        res.status(201).json(added);
      })
      .catch(err => {
        next({
          statusCode: 500,
          errorMessage: "Error occurred while adding actor",
          err,
        });
      });
  }
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  Actor.findActorById(id)
    .then(deletedActor => {
      Actor.deleteActor(id)
        .then(deleted => {
          if (deleted) {
            res.status(204).send("actor deleted successfully");
          }

          next({
            statusCode: 400,
            errorMessage: "No this actor in system",
            err,
          });
        })
        .catch(err => {
          next({
            statusCode: 500,
            errorMessage: "Occurred error while deleting actor",
            err,
          });
        });
    })
    .catch(err => {
      next({
        statusCode: 500,
        errorMessage: "Occurred error while finding actor",
        err,
      });
    });
});

router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  const updatedActor = req.body;

  if (!updatedActor.name) {
    next({
      statusCode: 400,
      errorMessage: "Please enter a actor name",
    });
  } else {
    Actor.updateActor(updatedActor, id)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err =>
        next({
          statusCode: 500,
          errorMessage: "Actor could not updated",
          err,
        })
      );
  }
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Actor.findActorById(id)
    .then(actor => {
      if (actor) {
        res.status(200).json(actor);
      }

      next({
        statusCode: 404,
        errorMessage: "There is no this actor in system",
      });
    })
    .catch(err =>
      next({
        statusCode: 500,
        errorMessage: "Actor could not found",
        err,
      })
    );
});

module.exports = router;
