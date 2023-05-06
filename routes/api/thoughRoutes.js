const router = require('express').Router();
const {
  getThoughts,
  getIndividualThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/courseController.js');

// /api/thoughts
router.route('/')
.get(getThoughts)
.post(createThought);

//  /api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getIndividualThought)
.put(updateThought)
.delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions (create a reaction  stored in a single thought's reactions array field )
router.route('/:thoughtId/reactions')
.post(addReaction);

//  /api/thoughts/:thoughtId/reactions/reactionId (delete reaction by Id value)
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;
