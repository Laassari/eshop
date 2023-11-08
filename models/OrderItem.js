import BaseModel from "./BaseModel.js";
import { query, SQL } from "../db/db.js";

class OrderItemSingelton extends BaseModel {
  async create({ orderId, productId, quantity }) {
    const { rows } = await query(SQL`
        INSERT INTO order_items
               (order_id, product_id, quantity)
        VALUES (${orderId}, ${productId}, ${quantity})
        RETURNING *
    `);

    this.assertOneRecord(rows);

    return this.formatRow(rows[0]);
  }
}

export default new OrderItemSingelton();
