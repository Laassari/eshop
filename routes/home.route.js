import { Router } from "express";

const router = Router();

function isAuthenticated(req, res, next) {
  if (req.session.user) return next();

  res.status(401).redirect(`/auth/signup?redirect_to=${req.url}`);
}

router.get("/", (req, res) => {
  const user = req.session.user;
  res.render("index", { full_name: user?.fullName });
});

router.get("/profile", isAuthenticated, (req, res) => {
  const user = req.session.user;

  res.render("profile", { user: user });
});

export default router;
