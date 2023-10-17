import BaseModel from "./BaseModel.js";
import { query, SQL } from "../db/index.js";

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
}

export default new ProductSingelton();
