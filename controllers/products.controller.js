import Product from "../models/Product.js";

export const index = async (req, res, next) => {
  const products = await Product.getProducts();

  res.send(products);
};
