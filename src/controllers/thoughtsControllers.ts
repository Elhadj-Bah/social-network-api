import { Request, Response } from "express";
import { User, Thoughts } from "../models/index.js";

// getAllThoughts

export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.find().populate("reactions");
    res.json(thoughts);
  } catch (error: any) {
    res.status(500).json(error);
    message: "Failed to get all thoughts";
  }
};
// getThoughtById

export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thoughts.findById(req.params.id);

    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({ message: "No thought found with this id!" });
    }
  } catch (error: any) {
    res.status(500).json(error);
    message: "Failed to get thought by id";
  }
};
// createThought

export const createThought = async (req: Request, res: Response) => {
  try {
    const newThought = await Thoughts.create(req.body);
    const userId = req.body.userId;

    console.log(userId);

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.json(newThought);
  } catch (error: any) {
    res.status(500).json(error);
    message: "Failed to create thought";
  }
};
// updateThought
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thoughtId = req.params.thoughtId;
    const updatedThought = await Thoughts.findByIdAndUpdate(
      thoughtId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedThought) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.json(updatedThought);
  } catch (error: any) {
    res.status(500).json(error);
    message: "Failed to update thought";
  }
};
// deleteThought
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thoughtId = req.params.thoughtId;
    const deletedThought = await Thoughts.findByIdAndDelete(thoughtId);
    if (!deletedThought) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.json(deletedThought);
  } catch (error: any) {
    res.status(500).json(error);
    message: "Failed to delete thought";
  }
};
// addReaction

export const addReaction = async (req: Request, res: Response) => {
  try {
    const thoughtId = req.params.thoughtId;
    const newReaction = req.body;
    const updatedThought = await Thoughts.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: newReaction } },
      { new: true, runValidators: true }
    );
    if (!updatedThought) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.json(updatedThought);
  } catch (error: any) {
    res.status(500).json(error);
    message: "Failed to add reaction";
  }
};
// deleteReaction

export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const thoughtId = req.params.thoughtId;
    const reactionId = req.params.reactionId;
    const updatedThought = await Thoughts.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId } } },
      { new: true }
    );
    if (!updatedThought) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.json(updatedThought);
  } catch (error: any) {
    res.status(500).json(error);
    message: "Failed to delete reaction";
  }
};
