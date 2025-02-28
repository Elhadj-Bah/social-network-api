import { Router } from "express";
const router = Router();
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction, } from "../../controllers/thoughtsControllers.js";
// /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);
// /api/thoughts/:id
router
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
router.route("/:thoughtID/reactions").post(addReaction);
// /api/thoughts/:thoughtID/reactions/:reactionID
router.route("/:thoughtID/reactions/:reactionID").delete(deleteReaction);
export default router;
