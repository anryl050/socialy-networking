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
        .json({ message: 'Internal server error' });
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

      res.json(thoughtData);

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
        .create(req.body);
      const userData = await User
        .findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thoughtData._id } },
          { new: true }
        );

      if (!userData) {
        return res
        .status(400)
        .json({ message: "The though was created, but no user found." });
      }

      res.json({ message: "The Thought was created!" });

    } catch (err) {

      console.log(err);

      return res
        .status(500)
        .json({ message: 'Internal server error' });
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
        .json({ message: 'Internal server error' });
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
  
        res.status(500).json({ message: 'Internal server error' });
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
          { $push: { reactions: req.body } },
          {
            // runValidators: true,
            new: true
          }
        );


      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID' });
      }

      console.log(thoughtData);

      res.json(thoughtData);

    } catch (err) {
      res
        .status(500)
        .json({ message: 'Internal server error' });
    }
  },

  // remove a raction from the thought
  async deleteReaction(req, res) {

    console.log('You are removing a reaction');


    try {
      const thoughtData = await Thought
        .findOneAndUpdate(
          { _id: req.params.thoughtId },
          {
            $pull:
              { reactions: { reactionId: req.params.reactionId} }
          },
          {
            runValidators: true,
            new: true
          }
        );
        
        console.log("hi");

      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID' });
      }

      console.log(thoughtData);

      res.json(thoughtData);


    } catch (err) {
      res
        .status(500)
        .json({ message: 'An error occurred while deleting the reactionor' });
    }

  }

};

