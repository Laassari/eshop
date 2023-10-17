import Product from "../models/Product.js";

export const index = async (req, res, next) => {
  const products = await Product.getProducts();

  res.send(products);
};

export const show = async (req, res, next) => {
  const product = await Product.getProductById(req.params.id);

  if (!product) {
    return res.sendStatus(404);
  }

  res.send(product);
};
