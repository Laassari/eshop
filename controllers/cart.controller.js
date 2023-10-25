import Cart from "../lib/cart.js";

export const getCart = (req, res) => {
  res.send(req.session.cart);
};

export const addToCart = async (req, res) => {
  const productId = req.body.productId;
  const CartInstance = new Cart(req.session);

  const cart = await CartInstance.addToCart(productId);

  res.send(cart);
};

