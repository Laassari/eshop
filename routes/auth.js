import { Router } from "express";

import { signupValidation, signup } from "../controllers/auth.controller.js";

const router = Router();

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", signupValidation, signup);

export default router;
