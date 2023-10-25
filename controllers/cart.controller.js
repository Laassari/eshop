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

export const updateCart = (req, res) => {
  const { cartItemId, quantity } = req.body;
  const CartInstance = new Cart(req.session);

  const cart = CartInstance.updateCart(cartItemId, quantity);

  res.send(cart);
};

export const removeFromCart = (req, res) => {
  const { cartItemId } = req.params;
  const CartInstance = new Cart(req.session);

  const cart = CartInstance.removeFromCart(cartItemId);

  res.send(cart);
};
