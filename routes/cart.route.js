import { Router } from "express";
import { isAuthenticated } from "./index.js";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", isAuthenticated, getCart);

router.post("/", isAuthenticated, addToCart);
router.delete("/:cartItemId", removeFromCart)
router.post("/clear-cart", isAuthenticated, (req, res) => {
  req.session.cart = null;

  res.sendStatus(200)
});

export default router;
