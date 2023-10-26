import Cart from "cart";

const addToCartBtn = document.querySelector("button.add-to-cart");

addToCartBtn.addEventListener("click", async () => {
  await Cart.addToCart(addToCartBtn.dataset.productId);

  window.location.reload()
});
