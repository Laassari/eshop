import Cart from "../lib/cart.js";

export const getCart = (req, res) => {
  res.render('cart/cart.html')
};

export const addToCart = async (req, res) => {
  const productId = req.body.productId;
  const CartInstance = new Cart(req.session);

  try {
    const cart = await CartInstance.addToCart(productId);
    res.send(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const updateCart = (req, res) => {
  const { cartItemId, quantity } = req.body;
  const CartInstance = new Cart(req.session);

  try {
    const cart = CartInstance.updateCart(cartItemId, quantity);
    res.send(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const removeFromCart = (req, res) => {
  const { cartItemId } = req.params;
  const CartInstance = new Cart(req.session);

  try {
    const cart = CartInstance.removeFromCart(cartItemId);
    res.send(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
