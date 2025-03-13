import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./constants";

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
    autoSignIn: true,
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
      pass: {
        type: "string",
        required: true,
      },
      isAdmin: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
});
