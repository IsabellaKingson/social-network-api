const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .post(addReaction)
  .put(updateThought);

// /api/thoughts/:thoughtId/:reactionId
router
  .route("/:thoughtId/:reactionId")
  .delete(removeReaction);

module.exports = router;
