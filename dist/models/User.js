"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema to create User model
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    thoughts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Thoughts",
        },
    ],
    friends: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// Virtual to get the total count of friends
UserSchema.virtual("friendCount").get(function () {
    return this.friends?.length;
});
// Initialize our User model
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
