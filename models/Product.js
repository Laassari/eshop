import BaseModel from "./BaseModel.js";
import { query, SQL } from "../db/index.js";

class ProductSingelton extends BaseModel {
  async getProducts() {
    const { rows } = await query(SQL`SELECT * FROM products limit 10`);

    return rows.map((row) => this.formatRow(row));
  }

  async getProductById(id) {
    const { rows } = await query(SQL`SELECT * FROM products WHERE id = ${id}`);

    assertOneRecord(rows);

    return this.formatRow(rows[0]);
  }
}

export default new ProductSingelton();
