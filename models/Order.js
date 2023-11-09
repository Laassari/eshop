import BaseModel from "./BaseModel.js";
import OrderItem from "./OrderItem.js";
import { query as q, SQL, transaction } from "../db/db.js";

class OrderSingelton extends BaseModel {
  async findById(id) {
    const { rows, rowCount } = await q(
      SQL`SELECT * FROM orders WHERE id = ${id}`
    );

    this.assertOneRecord(rows);

    if (rowCount === 0) return null;

    return this.formatRow(rows[0]);
  }

  async create(query, { userId, total, subTotal, shipping }) {
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

    await transaction(async (client) => {
      const order = await this.create(client.query.bind(client), {
        userId,
        total,
        subTotal,
        shipping,
      });

      const items = await Promise.all(
        orderItemsData.map(({ productId, quantity }) => {
          return OrderItem.create(client.query.bind(client), {
            orderId: order.id,
            productId,
            quantity,
          });
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
