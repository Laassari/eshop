import pg from "pg";
import { SQL } from "sql-template-strings";

const pool = new pg.Pool();

export const query = (text, params) => pool.query(text, params);

export const transaction = async (cb) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await cb(client);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const inniDbtConnection = async () => {
  return pool.connect().then((client) => client.release());
};

export { SQL };
