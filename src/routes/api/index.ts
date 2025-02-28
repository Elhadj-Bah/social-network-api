import { Router } from "express";
import { userRoutes } from "./userRoutes.js";
import thoughtRoutes from "./thoughtRoutes.js";

const router = Router();
// ALL of these routes are prefixed with '/api'
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

export default router;
