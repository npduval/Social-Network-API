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

    // update a thought
    updateThought(req, res) {
      Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          {$set: req.body},
          {new: true})
        .then((thought) => {
          if (!thought) {
             res.status(404).json({ message: 'No thought with that ID' })
          } else {
            res.json(thought);
          }
        })
        .catch((err) => res.status(500).json(err));
    },
    
    
    // Update a course
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) => {
            if (!thought) {
            res.status(404).json({ message: 'No thought by that ID' })
            } else {
              res.json({ message: 'Thought has been deleted' })
            }
          })   
          .catch((err) => res.status(500).json(err));
    },
        // add a new reaction
    addReaction(req,res) {
        Thought.findOneAndUpdate (
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
        .then((thought) => {
            if (!thought){
                res.status(404).json({ message: 'No thought by this id!' })
            } else {
                res.json(thought);
            }
        })
            .catch((err) => res.status(500).json(err));
        
        },

            //delete a reaction
   deleteReaction( req, res) { 
       Thought.findOneAndUpdate (
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
       )
       .then((thought) => {
           if (!thought) {
               res.status(404).json({ message: 'No thought with this id!' });
            } else {
                res.json(thought)
            }
        })
        .catch((err) => res.status(500).json(err));

   },
};
  
  