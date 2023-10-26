class Cart {
  async addToCart(productId) {
    const res = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify({ productId: productId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const cart = await res.json();

      return cart;
    }

    console.log(res.statusText);
  }
}

export default new Cart();
