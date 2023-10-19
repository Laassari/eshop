import BaseModel from "./BaseModel.js";
import { query, SQL } from "../db/db.js";

class ProductSingelton extends BaseModel {
  async getProducts() {
    const { rows } = await query(SQL`SELECT * FROM products ORDER BY id`);

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
    const { title, description, price, imageUrl } = product;

    const { rows } = await query(
      SQL`INSERT INTO
        products
                (title, description, price, image_url)
        values (${title}, ${description}, ${price}, ${imageUrl})
        RETURNING *
      `
    );

    this.assertOneRecord(rows);

    return this.formatRow(rows[0]);
  }
}

export default new ProductSingelton();
