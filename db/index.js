import pg from "pg";
import { SQL } from "sql-template-strings";

const pool = new pg.Pool();

export const query = (text, params) => pool.query(text, params);
export { SQL };
