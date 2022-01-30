const { Schema, Types } = require("mongoose");



const userSchema = new mongoose.Schema({
 
    username: { 
        type: String, 
        required: true,
        unique: true,
        trim: true
    },
      email: {
        type: String, 
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    }
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thoughts",
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
      ],


});
  



//thoughts -  Array of `_id` values referencing the `Thought` model



//friends - Array of `_id` values referencing the `User` model (self-reference)


// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
