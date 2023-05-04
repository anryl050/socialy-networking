const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // email address validation
            // TODO: ask Dominique if this value can be replaced by any regex for the email address or does it have to be specific to this
            match: /.+\@.+\..+/,
        },
        // Array of _id values referencing the Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ]
        ,
        // Array of _id values referencing the User model (self-reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        toJSON: {
            getters: true,
        },
        // TODO: Ask Dominique what does this do? Mimicked it from the Mini Project
        id: false,
    }
);

// Create a virtual property `friendCount` that gets user's friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Initialize User model
const User = model('user', studentSchema);

module.exports = User;