import { Router } from "express";
import apiRoutes from "./api/index.js";
const router = Router();
router.use("/api", apiRoutes); // WE ARE REDIRECTING the incoming REQUEST OBJECT
export default router;
