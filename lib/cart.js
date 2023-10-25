import Product from "../models/Product.js";

const SHIPPING_COST = 32;

export default class Cart {
  constructor(session) {
    this.session = session;

    this.#initializeCart();
    this.cart = this.session.cart;
  }

  async addToCart(productId) {
    const product = await Product.findById(productId);
    if (!product) throw new Error("product doesn't exist");

    if (this.#isProductInCart(productId)) {
      const product = this.cart.cartItems.find(
        (cartItem) => parseInt(cartItem.product.id) === parseInt(productId)
      );

      product.quantity += 1;
      this.#updateCartRates();

      return this.cart;
    }

    this.cart.cartItems.push({
      id: crypto.randomUUID(),
      product,
      quantity: 1,
    });

    this.#updateCartRates();

    return this.cart;
  }

  removeFromCart(cartItemId) {
    const itemIndex = this.cart.cartItems.findIndex(
      (item) => item.id === cartItemId
    );

    if (itemIndex === -1) return this.cart;

    this.cart.cartItems.splice(itemIndex, 1);
    this.#updateCartRates();

    return this.cart;
  }

  #updateCartRates() {
    this.cart.subTotal = this.cart.cartItems.reduce(
      (curr, prev) =>
        curr + parseInt(prev.product.priceCents / 100) * prev.quantity,
      0
    );
    this.cart.total = this.cart.subTotal + this.cart.shipping;
  }

  #isProductInCart(productId) {
    const productIndex = this.cart.cartItems.findIndex(
      (cartItem) => parseInt(cartItem.product.id) === parseInt(productId)
    );

    return productIndex > -1;
  }

  #initializeCart() {
    if (this.session.cart) return;

    /**
     * CartItem shape
     * cartItem = {
     *    id: 1,
     *    product: Product.findById(1),
     *    quantity: 1
     * }
     */

    this.session.cart = {
      id: crypto.randomUUID(),
      cartItems: [],
      shipping: SHIPPING_COST,
      subTotal: 0,
      total: 0,
    };
  }
}
