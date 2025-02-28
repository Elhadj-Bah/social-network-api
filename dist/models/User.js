import { Schema, model } from "mongoose";
// Schema to create User model
const UserSchema = new Schema({
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
            type: Schema.Types.ObjectId,
            ref: "Thoughts",
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
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
const User = model("User", UserSchema);
export default User;
