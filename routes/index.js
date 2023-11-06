import homeRoutes from "./home.route.js";
import authRoutes from "./auth.route.js";
import productsRoutes from "./products.route.js";
import cartRoutes from "./cart/index.js";
import profileRoutes from "./profile/index.js";

export function isAuthenticated(req, res, next) {
  if (req.session.user) return next();

  res.status(401).redirect(`/auth/login?redirect_to=${req.originalUrl}`);
}

export function mountRoutes(app) {
  app.use("/", homeRoutes);
  app.use("/auth", authRoutes);
  app.use("/products", productsRoutes);
  app.use("/cart", cartRoutes);
  app.use("/profile", profileRoutes);
}
