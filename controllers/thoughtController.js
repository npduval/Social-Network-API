const { Thought, User } = require('../models')

module.exports = {
    // Get all thoughts
    allThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Get thought by id
    oneThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) => {
         if (!thought) {
         res.status(404).json({ message: 'No thought by that ID' })
         } else {
            res.json(thought)
         }
        })
        .catch((err) => res.status(500).json(err));
    },
    // Create a thought and update user
    addThought(req, res) {
      Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        )
      })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'Thought created however no user by that ID' })
            } else {
            res.json({ message: 'Thought successfully created!' });
            }
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },



    // Delete a course
    deleteCourse(req, res) {
      Course.findOneAndDelete({ _id: req.params.courseId })
        .then((course) =>
          !course
            ? res.status(404).json({ message: 'No course with that ID' })
            : Student.deleteMany({ _id: { $in: course.students } })
        )
        .then(() => res.json({ message: 'Course and students deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    // Update a course
    updateCourse(req, res) {
      Course.findOneAndUpdate(
        { _id: req.params.courseId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((course) =>
          !course
            ? res.status(404).json({ message: 'No course with this id!' })
            : res.json(course)
        )
        .catch((err) => res.status(500).json(err));
    },
  };
  