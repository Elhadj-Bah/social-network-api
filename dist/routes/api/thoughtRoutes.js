"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const thoughtsControllers_js_1 = require("../../controllers/thoughtsControllers.js");
// /api/thoughts
router.route("/").get(thoughtsControllers_js_1.getAllThoughts).post(thoughtsControllers_js_1.createThought);
// /api/thoughts/:id
router
    .route("/:id")
    .get(thoughtsControllers_js_1.getThoughtById)
    .put(thoughtsControllers_js_1.updateThought)
    .delete(thoughtsControllers_js_1.deleteThought);
router.route("/:thoughtID/reactions").post(thoughtsControllers_js_1.addReaction);
router.route("/:thoughtID/reactions/:reactionID").delete(thoughtsControllers_js_1.deleteReaction);
exports.default = router;
