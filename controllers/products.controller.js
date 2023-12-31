import Product from "../models/Product.js";

export const index = async (req, res) => {
  const filters = {};

  if (isAllowedCategory(req.query.category)) {
    filters.category = req.query.category;
  }

  const products = await Product.getProducts(filters);

  res.render("products/index", {
    products,
    currentCategory: filters.category,
    categories: Product.PRODUCT_CATEGORIES,
  });
};

export const show = async (req, res) => {
  const { id } = req.params;

  const [product, relatedProducts] = await Promise.all([
    Product.findById(id),
    Product.findRelatedFor(id, 8),
  ]);

  if (!product) {
    return res.sendStatus(404);
  }

  res.render("products/show", { product, relatedProducts });
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

function isAllowedCategory(category) {
  return Product.PRODUCT_CATEGORIES.includes(category);
}
