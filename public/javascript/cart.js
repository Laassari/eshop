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

  async removeFromCart(cartItemId) {
    const res = await fetch(`/cart/${cartItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) {
      return { ok: res.ok, cart: data, error: null };
    }

    return { ok: res.ok, error: data.message };
  }
}

export default new Cart();
