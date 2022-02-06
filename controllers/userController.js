const { Thought, User } = require('../models')

module.exports = {
    // Get all users
    allUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // Get user by id
    oneUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .then((user) => {
         if (!user) {
         res.status(404).json({ message: 'No user by that ID' })
         } else {
            res.json(user)
         }
        })
        .catch((err) => res.status(500).json(err));
    },
    // Create a new user
    addUser(req, res) {
      User.create(req.body)
      .then((user) => {
          res.json(user)
        })
        .catch((err) => res.status(500).json(err));
    },

    // update a user
    updateUser(req, res) {
      User.findOneAndUpdate(
          { _id: req.params.userId },
          {$set: req.body},
          {new: true})
        .then((user) => {
          if (!user) {
             res.status(404).json({ message: 'No user with that ID' })
          } else {
            res.json(user);
          }
        })
        .catch((err) => res.status(500).json(err));
    },
    
    
    // Update a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) => {
            if (!user) {
            res.status(404).json({ message: 'No user by that ID' })
            } else {
                res.json({ message: 'User has been deleted' });
               
            }
          })    
          .catch((err) => res.status(500).json(err));
    },

        // add a new friend
    addFriend(req,res) {
        User.findOneAndUpdate (
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
        .then((user) => {
            if (!user){
                res.status(404).json({ message: 'No user by this id!' })
            } else {
                res.json(user);
            }
        })
            .catch((err) => res.status(500).json(err));
        
        },

            //delete a reaction
    deleteFriend( req, res) { 
       User.findOneAndUpdate (
        { _id: req.params.userId },
        { $pull: { friends: {friends: req.params.friendId } } },
        { new: true }
       )
       .then((user) => {
           if (!user) {
               res.status(404).json({ message: 'No user with this id!' });
            } else {
                res.json(user)
            }
        })
        .catch((err) => res.status(500).json(err));

   },
};
  
  