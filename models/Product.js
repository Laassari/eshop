import BaseModel from "./BaseModel.js";
import { query, SQL } from "../db/db.js";

class ProductSingelton extends BaseModel {
  async getProducts({ limit } = {}) {
    const q = SQL`SELECT * FROM products ORDER BY id`;

    if (limit) q.append(SQL` LIMIT ${limit}`);
    const { rows } = await query(q);

    return rows.map((row) => this.formatRow(row));
  }

  async findById(id) {
    const { rows, rowCount } = await query(
      SQL`SELECT * FROM products WHERE id = ${id}`
    );

    this.assertOneRecord(rows);

    if (rowCount === 0) return null;

    return this.formatRow(rows[0]);
  }

  async deleteById(id) {
    const { rows, rowCount } = await query(
      SQL`DELETE FROM products WHERE id = ${id}`
    );

    this.assertOneRecord(rows);

    // 1 item deleted
    if (rowCount === 1) {
      return true;
    }

    return false;
  }

  async create(product) {
    const { title, description, price, category, imageUrl } = product;

    const { rows } = await query(
      SQL`INSERT INTO
        products
                (title, description, price, image_url, category)
        values (${title}, ${description}, ${price}, ${imageUrl}, ${category})
        RETURNING *
      `
    );

    this.assertOneRecord(rows);

    return this.formatRow(rows[0]);
  }

  async findRelatedFor(productId, limit) {
    const { rows } = await query(SQL`
      WITH orders_with_similar_product AS (
        SELECT
          ARRAY_AGG(product_id) AS pids
        FROM
          order_items
        GROUP BY
          order_id
        HAVING
          ${productId} = ANY (ARRAY_AGG(product_id))
          AND COUNT(product_id) > 1
      ),
      related_product_ids AS (
        SELECT
          UNNEST(pids) AS pid
        FROM
          orders_with_similar_product
        GROUP BY
          pid
        ORDER BY
          COUNT(*)
          DESC
          -- 	offset to remove the product in question
        LIMIT ${limit} OFFSET 1
      )
      SELECT
        *
      FROM
        products
      WHERE
        id IN(
          SELECT
            pid FROM related_product_ids);
    `);

    return rows.map(this.formatRow);
  }
}

export default new ProductSingelton();
