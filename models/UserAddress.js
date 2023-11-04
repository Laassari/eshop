import BaseModel from "./BaseModel.js";
import { query, SQL } from "../db/db.js";

class UserAddressSingelton extends BaseModel {
  async create({ city, zipCode, address, userId }) {
    const { rows } = await query(
      SQL`
        INSERT INTO user_address
                   (user_id, zip_code, address, city)
            VALUES (${userId}, ${zipCode}, ${address}, ${city})
            RETURNING *
        `
    );

    this.assertOneRecord(rows);

    return this.formatRow(rows[0]);
  }
}

export default new UserAddressSingelton();
