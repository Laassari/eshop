import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const user = req.session.user;
  res.render("index", { full_name: user.full_name });
});

export default router;
