import { Router } from "express";

import { signupValidation, signup, signOut } from "../controllers/auth.controller.js";

const router = Router();

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", signupValidation, signup);
router.post("/signOut", signOut);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res) => {
  res.render("auth/login");
});

export default router;
