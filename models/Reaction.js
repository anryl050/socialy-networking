const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

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
            get: (date) => dayjs(date).format('DD/MM/YYYY')
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
// const Reaction = model('reaction', reactionSchema);

// module.exports = Reaction;
module.exports = reactionSchema;