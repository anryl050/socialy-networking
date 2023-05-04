const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // TODO: Use a getter method to format the timestamp on query
        },
        //   Array of nested documents created with the reactionSchema
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// Create a virtual property `reactionCount` that gets thought's reaction count
userSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
