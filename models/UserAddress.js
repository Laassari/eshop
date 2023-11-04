import BaseModel from "./BaseModel.js";
import { query, SQL } from "../db/db.js";

class UserAddressSingelton extends BaseModel {
  async findForUser(id) {
    const { rows } = await query(
      SQL`SELECT * FROM user_address WHERE user_id = ${id}`
    );

    this.assertOneRecord(rows);

    return this.formatRow(rows[0]);
  }

  async createOrUpdate({ city, zipCode, address, userId }) {
    const { rows } = await query(
      SQL`
        INSERT INTO user_address
                   (user_id, zip_code, address, city)
            VALUES (${userId}, ${zipCode}, ${address}, ${city})
            ON CONFLICT (user_id) DO UPDATE
            SET zip_code = EXCLUDED.zip_code, address = EXCLUDED.address, city = EXCLUDED.city
            RETURNING *
        `
    );

    this.assertOneRecord(rows);

    return this.formatRow(rows[0]);
  }
}

export default new UserAddressSingelton();
