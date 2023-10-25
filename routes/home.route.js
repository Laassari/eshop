import { Router } from "express";
import { isAuthenticated } from "./index.js";

const router = Router();

router.get("/", (req, res) => {
  const user = req.session.user;
  res.render("index", { full_name: user?.fullName });
});

router.get("/profile", isAuthenticated, (req, res) => {
  const user = req.session.user;

  res.render("profile", { user: user });
});

export default router;
