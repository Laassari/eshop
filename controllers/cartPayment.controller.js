import { body, validationResult } from "express-validator";
import Cart from "../lib/cart.js";

export const index = async (req, res) => {
  res.render("cart/payment");
};

export const processCartValidtion = [
  body("cardHolderName", "Invalid Card Holder Name")
    .isString()
    .isLength({ max: 100, min: 6 })
    .exists(),
  body("cardNumber", "Invalid Card Number").isCreditCard().exists(),
  body("cardExpiry", "Invalid Card Expiry").isAfter().exists(),
];

export const processCart = async (req, res) => {
  const result = validationResult(req);
  const CartInstance = new Cart(req.session);

  if (!result.isEmpty()) {
    return res.status(422).render("cart/payment", {
      errors: result.array({ onlyFirstError: true }),
    });
  }

  try {
    const order = await CartInstance.processCart(req.session.user.id);

    res.redirect(`/order/${order.id}`);
  } catch (error) {
    console.error(error);
    res.render("cart/payment", { errors: [{ msg: error }] });
  }
};
