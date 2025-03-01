"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.userRoutes = router;
const userControllers_js_1 = require("../../controllers/userControllers.js");
router.route("/").get(userControllers_js_1.getUsers).post(userControllers_js_1.createUser);
router.route("/:userId").get(userControllers_js_1.getUserById).put(userControllers_js_1.updateUser).delete(userControllers_js_1.deleteUser);
router.route("/:id/friends/:friendId").post(userControllers_js_1.addFriend);
router.route("/:id/friends/:friendId").delete(userControllers_js_1.removeFriend);
