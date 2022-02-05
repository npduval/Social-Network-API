const router = require("express").Router();

const {allThoughts,oneThought,addThought,addReaction} = require("../../controllers/thoughtController.js");

router.route("/").get(allThoughts).post(addThought);

router.route("/:id").get(oneThought);

router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;