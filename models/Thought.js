const { Schema, Types } = require("mongoose");
const reactionsSchema = require('./Reaction');


const thoughtSchema = new Schema({
    
    thoughtText: { 
        type: String, 
        required: true,
        minlength:1,
        maxlength:280,
    },


      createdAt :{
        date: { 
            type: Date, 
            default: Date.now 
        }
    },
    
        username : {
            type: String,
            required: true,
    },
    reactions: [reactionsSchema]
    
  },
    {
        toJSON: {
          virtuals: true,
        },
    });

    userSchema.virtual("reactionCount").get(function () {
        return this.reactions.length;
    });

    const Thought = model('Thought', thoughtSchema);
    
    module.exports = Thought;