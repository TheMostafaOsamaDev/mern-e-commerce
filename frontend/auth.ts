import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./config";

export const auth = betterAuth({
  database: createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
    },
  },
});
