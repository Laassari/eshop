import Cart from "cart";

const addToCartBtn = document.querySelector("button.add-to-cart");

addToCartBtn.addEventListener("click", async () => {
  const { ok, error } = await Cart.addToCart(addToCartBtn.dataset.productId);

  if (ok) location.reload();
  else {
    alert(error);
  }
});
