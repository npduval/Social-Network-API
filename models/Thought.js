const { Schema } = require("mongoose");



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

    reactions: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
        toJSON: {
          virtuals: true,
        },
    });

    userSchema.virtual("reactionCount").get(function () {
        return this.reactions.length;
    });

    const Thought = model("thought", thoughtSchema);

    module.exports = Thought;