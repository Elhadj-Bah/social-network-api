import { User, Thoughts } from "../models"; // Import User and Thoughts models
// Get all users
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find().populate("friends").populate("thoughts"); // Find all users
        res.json(users); // Send the users
    }
    catch (error) {
        res.status(500).json({ message: error.message }); // Send the error
    }
    //   res.status(500).json({ message: (error as any).message }); // Send the error
};
// Get a sigle user by its id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
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
// create a new user
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// update a user by id
export const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!user) {
            res.status(404).json({ message: "No user found no user with that ID" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
// Delete a user by id
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _req: req.params.userId }); // Delete a user by id
        if (!user) {
            res.status(404).json({ message: "User not found with that ID" }); // If user is not found
        }
        else {
            await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: "User deleted successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message }); // Send the error
    }
};
// Add a friend
export const addFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
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
// Remove a friend from a user
export const removeFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate({ _id: req.params.friendIdId }, { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true }); // Find a user by id and update it
        if (!user) {
            res.status(404).json({ message: "User not found with that ID" }); // If user is not found
        }
        res.json({ user });
    }
    catch (error) {
        res.status(500).json({ message: error.message }); // Send the error
    }
};
