import { Router } from "express";

const router = Router();
// ALL of these routes are prefixed with '/api/users'
router.get("/", async (req, res) => {
  // We want to QUERY our DATABASE for ALL of the USERS
  const allusers = await User.find({});

  res.json(allUsers);
});

export default router;
