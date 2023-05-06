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
        .select('-__v');

      if (!course) {
        return res.status(404).json({ message: 'No course with that ID' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const course = await Course.create(req.body);
      res.json(course);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const course = await Course.findOneAndDelete({ _id: req.params.courseId });

      if (!course) {
        res.status(404).json({ message: 'No course with that ID' });
      }

      await Student.deleteMany({ _id: { $in: course.students } });
      res.json({ message: 'Course and students deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a course
  async updateThought(req, res) {
    try {
      const course = await Course.findOneAndUpdate(
        { _id: req.params.courseId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!course) {
        res.status(404).json({ message: 'No course with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // add a reaction to the thought
  async addReaction(req, res){
    
  },

  // remove a raction from the thought
  async deleteReaction(req, res){

  }
}

