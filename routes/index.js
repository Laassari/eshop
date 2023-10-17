import homeRoutes from "./home.route.js";
import authRoutes from "./auth.route.js";
import productsRoutes from "./products.route.js";

export function mountRoutes(app) {
  app.use("/", homeRoutes);
  app.use("/auth", authRoutes);
  app.use("/products", productsRoutes);
}
