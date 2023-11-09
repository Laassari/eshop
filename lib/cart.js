import { orderCreatedEmail } from "../emails/orderCreatedEmail.js";
import Order from "../models/Order.js";
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
      const cartItem = this.cart.cartItems.find(
        (cartItem) => parseInt(cartItem.product.id) === parseInt(productId)
      );

      cartItem.quantity += 1;
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

    if (itemIndex === -1) throw new Error("Item doesn't exist in cart");

    this.cart.cartItems.splice(itemIndex, 1);
    this.#updateCartRates();

    return this.cart;
  }

  updateCart(cartItemId, quantity) {
    if (!quantity || quantity <= 0) throw new Error("Quantity can't be less 1");

    const cartItem = this.cart.cartItems.find(
      (cartItem) => cartItem.id === cartItemId
    );

    if (!cartItem) throw new Error("Cart item doesn't exist");

    cartItem.quantity = quantity;

    this.#updateCartRates();

    return this.cart;
  }

  async processCart(user) {
    const { cartItems, shipping, subTotal, total } = this.cart;
    const orderData = { userId: user.id, total, subTotal, shipping };
    const orderItemsData = cartItems.map((item) => ({
      orderId: null,
      productId: item.product.id,
      quantity: item.quantity,
    }));

    const order = await Order.createWithItems(orderData, orderItemsData);

    try {
      orderCreatedEmail(user.email, user, order);
    } catch (error) {
      console.error(error);
    }

    this.cart = this.#resetCart();
    return order;
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
    const cartitemIndex = this.cart.cartItems.findIndex(
      (cartItem) => parseInt(cartItem.product.id) === parseInt(productId)
    );

    return cartitemIndex > -1;
  }

  #initializeCart() {
    if (this.session.cart) return;

    this.session.cart = this.#defaultCartData();
  }

  #resetCart() {
    this.session.cart = this.#defaultCartData();
  }

  #defaultCartData() {
    /**
     * CartItem shape
     * cartItem = {
     *    id: 1,
     *    product: Product.findById(1),
     *    quantity: 1
     * }
     */

    return {
      id: crypto.randomUUID(),
      cartItems: [],
      shipping: SHIPPING_COST,
      subTotal: 0,
      total: 0,
    };
  }
}
