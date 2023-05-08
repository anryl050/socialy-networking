const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought
        .find()

      res.json(thoughtData);

    } catch (err) {
      res
        .status(500)
        .json(err);
    }
  },

  // Get a single thought
  async getIndividualThought(req, res) {
    try {
      const thoughtData = await Thought
        .findOne({ _id: req.params.thoughtId })

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(course);
    } catch (err) {
      res
        .status(500)
        .json(err);
    }
  },

  // Create a thought
  async createThought(req, res) {
    try {
      const thoughtData = await Thought
        .findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      res.json({ message: "The Thought was created!" });

    } catch (err) {

      console.log(err);

      return res
        .status(500)
        .json(err);
    }
  },

  // Delete user thought
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.
        findOneAndRemove({ _id: req.params.thoughtId });

      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: 'No such thought exists' });
      }

      const userData = await User
        .findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        )

      if (!userData) {
        return res
          .status(404)
          .json({ message: 'No user with this ID found for this thought' });
      }

      res.json({ message: 'The thought was successfully deleted' });

    } catch (err) {

      console.log(err);

      res.status(500).json(err);
    }
  },

  // Update user thought
  async updateThought(req, res) {
    try {
      const thoughtData = await Thought
        .findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          {
            runValidators: true,
            new: true
          }
        );

      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: 'No thought with this id exists!' });
      }

      res.json(thoughtData);

    } catch (err) {
      res
        .status(500)
        .json(err);
    }
  },

  // add a reaction to the thought
  async addReaction(req, res) {

    console.log('You are adding a reaction');
    console.log(req.body);

    try {
      const thoughtData = await Thought
        .findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.params.reactionId } },
          {
            runValidators: true,
            new: true
          }
        );

      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID' });
      }

      res.json(thoughtData);

    } catch (err) {
      res
        .status(500)
        .json(err);
    }
  },

  // remove a raction from the thought
  async deleteReaction(req, res) {

    console.log('You are removing a reaction');
    console.log(req.body);

    try {
      const thoughtData = await Thought
        .findOneAndUpdate(
          { _id: req.params.thoughtId },
          {
            $pull:
              { reactions: req.params.reactionId }
          },
          {
            runValidators: true,
            new: true
          }
        );
      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID' });
      }

      res.json(thoughtData);

    } catch (err) {
      res
        .status(500)
        .json(err);
    }

  },
};

