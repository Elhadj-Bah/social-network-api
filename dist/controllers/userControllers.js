"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = exports.addFriend = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const models_1 = require("../models"); // Import User and Thoughts models
// Get all users
const getUsers = async (_req, res) => {
    try {
        const users = await models_1.User.find().populate("friends").populate("thoughts"); // Find all users
        res.json(users); // Send the users
    }
    catch (error) {
        res.status(500).json({ message: error.message }); // Send the error
    }
    //   res.status(500).json({ message: (error as any).message }); // Send the error
};
exports.getUsers = getUsers;
// Get a sigle user by its id
const getUserById = async (req, res) => {
    try {
        const user = await models_1.User.findOne({ _id: req.params.userId })
            .populate("friends")
            .populate("thoughts"); // Find a user by id
        if (!user) {
            res.status(404).json({ message: "User not found with that id" }); // If user is not found
        }
        else
            res.json(user); // Send the error
    }
    catch (error) {
        res.status(500).json(error); // Send the error
    }
};
exports.getUserById = getUserById;
// create a new user
const createUser = async (req, res) => {
    try {
        const user = await models_1.User.create(req.body);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createUser = createUser;
// update a user by id
const updateUser = async (req, res) => {
    try {
        const user = await models_1.User.findOneAndUpdate({ _id: req.body.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!user) {
            res.status(404).json({ message: "No user found no user with that ID" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.updateUser = updateUser;
// Delete a user by id
const deleteUser = async (req, res) => {
    try {
        const user = await models_1.User.findByIdAndDelete({ _req: req.params.userId }); // Delete a user by id
        if (!user) {
            res.status(404).json({ message: "User not found with that ID" }); // If user is not found
        }
        else {
            await models_1.Thoughts.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: "User deleted successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message }); // Send the error
    }
};
exports.deleteUser = deleteUser;
// Add a friend
const addFriend = async (req, res) => {
    try {
        const user = await models_1.User.findOneAndUpdate(
        // Find a user by id and update
        { _id: req.params.friendId }, { $addToSet: { friends: req.params.friendId } }, { runValidators: true, new: true });
        if (!user) {
            res.status(404).json({ message: "User not found with that ID" });
        }
        res.json({ user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addFriend = addFriend;
// Remove a friend from a user
const removeFriend = async (req, res) => {
    try {
        const user = await models_1.User.findByIdAndUpdate({ _id: req.params.friendIdId }, { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true }); // Find a user by id and update it
        if (!user) {
            res.status(404).json({ message: "User not found with that ID" }); // If user is not found
        }
        res.json({ user });
    }
    catch (error) {
        res.status(500).json({ message: error.message }); // Send the error
    }
};
exports.removeFriend = removeFriend;
