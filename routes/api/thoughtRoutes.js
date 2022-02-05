const router = require("express").Router();

const {allThoughts,oneThought,addThought,updateThought,deleteThought, addReaction, deleteReaction} = require("../../controllers/thoughtController.js");

router.route("/").get(allThoughts).post(addThought);

router.route("/:thoughtId").get(oneThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;