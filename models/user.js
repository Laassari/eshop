import { query } from "../db/index.js";
import SQL from "sql-template-strings";

export async function getUserByEmail(email) {
  const { rows, rowCount } = await query(
    SQL`SELECT * FROM users WHERE email = ${email}`
  );

  if (rowCount === 0) return null;

  return rows[0];
}
