import Cart from "cart";

const cartItems = document.querySelectorAll("main .cart .cart-item");

cartItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const { cartItemId, cartItemQuantity } = item.dataset;

    onCartItemClick(event, { cartItemId, cartItemQuantity });
  });
});

function onCartItemClick(event, { cartItemId, cartItemQuantity }) {
  const {
    increaseCartItem: increaseAction,
    decreaseCartItem: decreaseAction,
    deleteCartItem: deleteAction,
  } = event.target.dataset;

  let newQuantity = +cartItemQuantity;
  if (increaseAction) newQuantity++;
  else if (decreaseAction) newQuantity--;

  if (increaseAction || decreaseAction) {
    handleUpdateCartItem(event, cartItemId, newQuantity);
  } else if (deleteAction) {
    handleRemoveCartItem(event, cartItemId);
  }
}

async function handleRemoveCartItem({ target }, cartItemId) {
  target.classList.add("loader");
  try {
    const { ok, error } = await Cart.removeFromCart(cartItemId);

    if (ok) location.reload();
    else {
      alert(error);
    }
  } catch (error) {
    console.error(error);
  } finally {
    target.classList.remove("loader");
  }
}

async function handleUpdateCartItem({ target }, cartItemId, quantity) {
  target.classList.add("loader");

  try {
    const { ok, error } = await Cart.updateCart(cartItemId, quantity);

    if (ok) location.reload();
    else {
      alert(error);
    }
  } catch (error) {
    console.error(error);
  } finally {
    target.classList.remove("loader");
  }
}
