CREATE TYPE "product_category_type" AS ENUM ('men''s clothing', 'jewelery', 'electronics', 'women''s clothing');

ALTER TABLE products ADD COLUMN category "product_category_type";