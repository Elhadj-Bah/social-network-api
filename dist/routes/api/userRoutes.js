import { Router } from "express";
const router = Router();
import { getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend, } from "../../controllers/userControllers.js";
router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);
router.route("/:id/friends/:friendId").post(addFriend);
router.route("/:id/friends/:friendId").delete(removeFriend);
export default router;
