import { User, Thoughts } from "../models/index.js";
// getAllThoughts
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thoughts.find().populate("reactions");
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json(error);
        message: "Failed to get all thoughts";
    }
};
// getThoughtById
export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thoughts.findById(req.params.id);
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({ message: "No thought found with this id!" });
        }
    }
    catch (error) {
        res.status(500).json(error);
        message: "Failed to get thought by id";
    }
};
// createThought
export const createThought = async (req, res) => {
    try {
        const newThought = await Thoughts.create(req.body);
        const userId = req.body.userId;
        const user = await User.findOneAndUpdate({ _id: userId }, { $push: { thoughts: newThought._id } }, { new: true });
        if (!user) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(newThought);
    }
    catch (error) {
        res.status(500).json(error);
        message: "Failed to create thought";
    }
};
// updateThought
export const updateThought = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const updatedThought = await Thoughts.findByIdAndUpdate(thoughtId, req.body, { new: true, runValidators: true });
        if (!updatedThought) {
            res.status(404).json({ message: "No thought found with this id!" });
            return;
        }
        res.json(updatedThought);
    }
    catch (error) {
        res.status(500).json(error);
        message: "Failed to update thought";
    }
};
// deleteThought
export const deleteThought = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const deletedThought = await Thoughts.findByIdAndDelete(thoughtId);
        if (!deletedThought) {
            res.status(404).json({ message: "No thought found with this id!" });
            return;
        }
        res.json(deletedThought);
    }
    catch (error) {
        res.status(500).json(error);
        message: "Failed to delete thought";
    }
};
// addReaction
export const addReaction = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const newReaction = req.body;
        const updatedThought = await Thoughts.findByIdAndUpdate(thoughtId, { $push: { reactions: newReaction } }, { new: true, runValidators: true });
        if (!updatedThought) {
            res.status(404).json({ message: "No thought found with this id!" });
            return;
        }
        res.json(updatedThought);
    }
    catch (error) {
        res.status(500).json(error);
        message: "Failed to add reaction";
    }
};
// deleteReaction
export const deleteReaction = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const reactionId = req.params.reactionId;
        const updatedThought = await Thoughts.findByIdAndUpdate(thoughtId, { $pull: { reactions: { reactionId } } }, { new: true });
        if (!updatedThought) {
            res.status(404).json({ message: "No thought found with this id!" });
            return;
        }
        res.json(updatedThought);
    }
    catch (error) {
        res.status(500).json(error);
        message: "Failed to delete reaction";
    }
};
