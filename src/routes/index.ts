import { Router } from "express";
import apiRoutes from "./api/index.js";

const router = Router();

router.use("/api", apiRoutes); // WE ARE REDIRECTING the incoming REQUEST OBJECT
router.get("*", (req, res) => {
  res.status(404).send("404: Page not found");
});

export default router;
