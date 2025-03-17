import { createPool, Pool } from "mysql2";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "@/constants";

declare global {
  var mySqlPool: Pool | undefined;
}

export const dbPool =
  global.mySqlPool ??
  createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT,
    connectionLimit: 5,
    queueLimit: 0,
  });

global.mySqlPool = dbPool;
