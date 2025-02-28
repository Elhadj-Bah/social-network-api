"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: new mongoose_1.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // get : (timestamp: Date) => new Date (timestamp),
    },
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
});
const ThoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // get : (timestamp: Date) => new Date (timestamp),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
});
ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});
const Thoughts = (0, mongoose_1.model)("Thoughts", ThoughtSchema);
exports.default = Thoughts;
