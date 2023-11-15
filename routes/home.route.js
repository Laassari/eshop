import { Router } from "express";
import { isAuthenticated } from "./index.js";
import Product from "../models/Product.js";

const router = Router();

router.get("/", async (req, res) => {
  // TODO: return featured products
  const products = await Product.getProducts(null,  { limit: 8 });

  res.render("home", { products });
});

export default router;
