class Cart {
  async addToCart(productId) {
    const res = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify({ productId: productId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return this.formatJsonResponse(res);
  }

  async removeFromCart(cartItemId) {
    const res = await fetch(`/cart/${cartItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return this.formatJsonResponse(res);
  }

  async updateCart(cartItemId, quantity) {
    const res = await fetch(`/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity, cartItemId }),
    });

    return this.formatJsonResponse(res);
  }

  async formatJsonResponse(response) {
    const data = await response.json();

    if (response.ok) {
      return { ok: response.ok, cart: data, error: null };
    }

    return { ok: response.ok, error: data.message };
  }
}

export default new Cart();
