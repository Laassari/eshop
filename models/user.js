import BaseModel from "./BaseModel.js";
import { query, SQL } from "../db/index.js";

class UserSingelton extends BaseModel {
  async findByEmail(email) {
    const { rows, rowCount } = await query(
      SQL`SELECT * FROM users WHERE email = ${email}`
    );

    this.assertOneRecord(rows);

    if (rowCount === 0) return null;

    return this.formatRow(rows[0]);
  }
}

export default new UserSingelton();
