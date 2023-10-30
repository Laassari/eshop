import { Router } from "express";
import { isAuthenticated } from "./index.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/", getCart);

router.post("/", addToCart);
router.put("/", updateCart);
router.delete("/:cartItemId", removeFromCart);

router.post("/clear-cart", (req, res) => {
  req.session.cart = null;

  res.sendStatus(200);
});

export default router;
