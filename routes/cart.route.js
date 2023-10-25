import { Router } from "express";
import { isAuthenticated } from "./index.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", isAuthenticated, getCart);

router.post("/", isAuthenticated, addToCart);
router.post("/clear-cart", isAuthenticated, (req, res) => {
  req.session.cart = null;

  res.sendStatus(200)
});

export default router;
