import { Router } from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../../controllers/cart.controller.js";
import CartAddressRoutes from "./address.route.js";
import CartPaymentRoutes from "./payment.route.js";
import { isAuthenticated } from "../index.js";

export function isCartFull(req, res, next) {
  if (req.session.cart.cartItems.length) return next();

  res.status(401).redirect("/cart");
}

const router = Router();

router.get("/", getCart);

router.post("/", addToCart);
router.put("/", updateCart);
router.delete("/:cartItemId", removeFromCart);

router.post("/clear-cart", (req, res) => {
  req.session.cart = null;

  res.sendStatus(200);
});

router.use("/address", isAuthenticated, isCartFull, CartAddressRoutes);
router.use("/payment", isAuthenticated, isCartFull, CartPaymentRoutes);

export default router;
