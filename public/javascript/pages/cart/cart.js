import Cart from "cart";

const deleteCartItemBtns = document.querySelectorAll("button.delete-item");

[...deleteCartItemBtns].forEach((btn) =>
  btn.addEventListener("click", removeCartItem)
);

async function removeCartItem({ target }) {
  const { cartItemId } = target.dataset;

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
