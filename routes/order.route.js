import { Router } from "express";
import Order from "../models/Order.js";
import { isAuthenticated } from "./index.js";

const router = Router();

router.get("/:orderId", isAuthenticated, async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  res.render("cart/order_success", { order });
});

export default router;
