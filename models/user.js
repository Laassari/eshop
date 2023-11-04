import BaseModel from "./BaseModel.js";
import { query, SQL } from "../db/db.js";

class UserSingelton extends BaseModel {
  async findByEmail(email) {
    const { rows, rowCount } = await query(
      SQL`SELECT * FROM users WHERE email = ${email}`
    );

    this.assertOneRecord(rows);

    if (rowCount === 0) return null;

    return this.formatRow(rows[0]);
  }

  async create({ fullName, email, hashedPassword }) {
    const { rows } = await query(SQL`
        INSERT
        INTO    users 
                (full_name, email, hashed_password) 
        VALUES  (${fullName}, ${email}, ${hashedPassword}) RETURNING *
        `);

    this.assertOneRecord(rows);

    return this.formatRow(rows[0], ['hashed_password']);
  }

  async update(id, { fullName, email }) {
    const { rows } = await query(SQL`
        UPDATE users
        SET full_name = ${fullName}, email = ${email}
        WHERE id = ${id}
        RETURNING *
        `);

    this.assertOneRecord(rows);

    return this.formatRow(rows[0], ['hashed_password']);
  }
}

export default new UserSingelton();
