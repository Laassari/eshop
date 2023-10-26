import { Router } from "express";
import { isAuthenticated } from "./index.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/profile", isAuthenticated, (req, res) => {
  res.render("profile");
});

export default router;
