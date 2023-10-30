import Product from "../models/Product.js";

export const index = async (req, res) => {
  const products = await Product.getProducts();

  res.render("products/index", { products });
};

export const show = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.sendStatus(404);
  }

  res.render("products/show", { product });
};

export const destroy = async (req, res) => {
  const isDeleted = await Product.deleteById(req.params.id);

  res.send({ isDeleted });
};

// TODO: Validation & return generic errors instead of db error
export const create = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;

  try {
    const product = await Product.create({
      title,
      description,
      price,
      imageUrl,
    });

    return res.send(product);
  } catch (error) {
    return res.status(422).send(error);
  }
};
