import { query } from "../db/index.js";

export async function getUserByEmail(email) {
  const { rows, rowCount } = await query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (rowCount === 0) return null;

  return rows[0];
}
