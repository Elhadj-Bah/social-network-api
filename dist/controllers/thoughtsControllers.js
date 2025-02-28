"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReaction = exports.addReaction = exports.deleteThought = exports.updateThought = exports.createThought = exports.getThoughtById = exports.getAllThoughts = void 0;
const index_js_1 = require("../models/index.js");
// getAllThoughts
const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await index_js_1.Thoughts.find().populate("reactions");
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json(error);
        message: "Failed to get all thoughts";
    }
};
exports.getAllThoughts = getAllThoughts;
// getThoughtById
const getThoughtById = async (req, res) => {
    try {
        const thought = await index_js_1.Thoughts.findById(req.params.id);
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
exports.getThoughtById = getThoughtById;
// createThought
const createThought = async (req, res) => {
    try {
        const newThought = await index_js_1.Thoughts.create(req.body);
        const userId = req.body.userId;
        const user = await index_js_1.User.findOneAndUpdate({ _id: userId }, { $push: { thoughts: newThought._id } }, { new: true });
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
exports.createThought = createThought;
// updateThought
const updateThought = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const updatedThought = await index_js_1.Thoughts.findByIdAndUpdate(thoughtId, req.body, { new: true, runValidators: true });
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
exports.updateThought = updateThought;
// deleteThought
const deleteThought = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const deletedThought = await index_js_1.Thoughts.findByIdAndDelete(thoughtId);
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
exports.deleteThought = deleteThought;
// addReaction
const addReaction = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const newReaction = req.body;
        const updatedThought = await index_js_1.Thoughts.findByIdAndUpdate(thoughtId, { $push: { reactions: newReaction } }, { new: true, runValidators: true });
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
exports.addReaction = addReaction;
// deleteReaction
const deleteReaction = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const reactionId = req.params.reactionId;
        const updatedThought = await index_js_1.Thoughts.findByIdAndUpdate(thoughtId, { $pull: { reactions: { reactionId } } }, { new: true });
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
exports.deleteReaction = deleteReaction;
