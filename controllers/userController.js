const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

    // Get all users
    async getUsers(req, res) {
        try {
            const userData = await User
                .find()
                .select('-__v');

            res.json(userData);

        } catch (err) {

            console.log(err);

            return res
                .status(500)
                .json(err);
        }
    },


    // Get an individual user
    async getIndividualUser(req, res) {
        try {
            const userData = await User
                .findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('friends')
                .populate('thoughts');

            if (!userData) {
                return res
                    .status(404)
                    .json({ message: 'No user with that ID' })
            }

            res.json(userData);

        } catch (err) {
            console.log(err);
            return res
                .status(500)
                .json(err);
        }
    },

    // create a new user
    async createUser(req, res) {
        try {
            const userData = await User
                .create(req.body);

            res.json(userData);

        } catch (err) {
            res
                .status(500)
                .json(err);
        }
    },

    // update an existing user
    async updateUser(req, res) {
        try {
            const userData = await User
                .findOneAndUpdate(
                    { _id: req.params.userId },
                    { $set: req.body },
                    {
                        runValidators: true,
                        new: true
                    }
                );

            if (!userData) {
                return res
                    .status(404)
                    .json({ message: 'No such user exists' });
            }

            res.json(userData);

        } catch (err) {
            res
                .status(500)
                .json(err);
        }
    },



    //Delete a user and remove associated user's thoughts
    async deleteUser(req, res) {
        try {
            const userData = await User
                .findOneAndRemove({ _id: req.params.userId });

            if (!userData) {
                return res
                    .status(404)
                    .json({ message: 'No such user exists' });
            }

            const thoughtData = await Thought
                .deleteMany(
                    {
                        _id: {
                            $in: userData.thoughts
                        }
                    }
                );

            if (thoughtData.deleteCount === 0) {
                return res
                    .status(404)
                    .json({
                        message: 'User was deleted; however, no thoughts were found',
                    });
            }

            res.json({ message: 'User was successfully deleted' });

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // add a friend to a user's friend's list
    async addFriend(req, res) {

        console.log('You are adding a friend');
        console.log(req.body);

        try {
            const userData = await User
                .findOneAndUpdate(
                    { _id: req.params.userId },
                    { $addToSet: { friends: req.params.friendId } },
                    {
                        runValidators: true,
                        new: true
                    }
                );

            if (!userData) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID' });
            }

            res.json(userData);

        } catch (err) {
            res
                .status(500)
                .json(err);
        }
    },


    // remove a frined from the user's friend's list
    async deleteFriend(req, res) {

        console.log('You are removing a friend');
        console.log(req.body);

        try {
            const userData = await User
                .findOneAndUpdate(
                    { _id: req.params.userId },
                    {
                        $pull:
                            { friends: req.params.friendId }
                    },
                    {
                        runValidators: true,
                        new: true
                    }
                );

            if (!userData) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID :(' });
            }

            res.json(userData);

        } catch (err) {
            res
                .status(500)
                .json(err);
        }
    },
};
