const { Schema, model } = require('mongoose');

// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // TODO: Use a getter method to format the timestamp on query
          },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// Initialize Reaction model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
