import { query, SQL } from "../db/index.js";

export async function getUserByEmail(email) {
  const { rows, rowCount } = await query(
    SQL`SELECT * FROM users WHERE email = ${email}`
  );

  if (rowCount === 0) return null;

  return rows[0];
}
