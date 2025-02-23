import { Router } from "express";
import thoughtRoutes from "./api/thoughtRoutes.js";
import userRoutes from "./api/userRoutes.js";

const router = Router();
// ALL of these routes are prefixed with '/api'
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

export default router;
