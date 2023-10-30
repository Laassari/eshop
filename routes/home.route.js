import { Router } from "express";
import { isAuthenticated } from "./index.js";
import Product from "../models/Product.js";

const router = Router();

router.get("/", async (req, res) => {
  // TODO: return featured products
  const products = await Product.getProducts({ limit: 8 });

  res.render("home", { products });
});

router.get("/profile", isAuthenticated, (req, res) => {
  res.render("profile");
});

export default router;
