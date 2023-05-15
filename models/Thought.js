const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction");
const User = require('./User');
const dayjs = require('dayjs');

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
            get: (date) => dayjs(date).format('MM/DD/YYYY')
        },
        username: {
            type: String
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
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Initialize Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
