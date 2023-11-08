import BaseModel from "./BaseModel.js";
import OrderItem from "./OrderItem.js";
import { query, SQL, transaction } from "../db/db.js";

class OrderSingelton extends BaseModel {
  async findById(id) {
    const { rows, rowCount } = await query(
      SQL`SELECT * FROM orders WHERE id = ${id}`
    );

    this.assertOneRecord(rows);

    if (rowCount === 0) return null;

    return this.formatRow(rows[0]);
  }

  async create({ userId, total, subTotal, shipping }) {
    const { rows } = await query(SQL`
        INSERT INTO orders
               (user_id, total, sub_total, shipping)
        VALUES (${userId}, ${total}, ${subTotal}, ${shipping})
        RETURNING *
    `);

    this.assertOneRecord(rows);

    return this.formatRow(rows[0]);
  }

  async createWithItems(orderData, orderItemsData) {
    const { userId, total, subTotal, shipping } = orderData;
    let orderwithItems;

    // NOT REALLY A TRANSACTION
    await transaction(async (client) => {
      const order = await this.create({ userId, total, subTotal, shipping });

      const items = await Promise.all(
        orderItemsData.map(({ productId, quantity }) => {
          return OrderItem.create({ orderId: order.id, productId, quantity });
        })
      );

      orderwithItems = {
        ...this.formatRow(order),
        orderItems: items.map(this.formatRow),
      };
    });

    return orderwithItems;
  }
}

export default new OrderSingelton();
