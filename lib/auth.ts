import { betterAuth } from "better-auth";
import { Kysely, PostgresDialect } from "kysely";
import { pool } from "./db";

const db = new Kysely({
  dialect: new PostgresDialect({
    pool,
  }),
});

export const auth = betterAuth({
  database: db,
});
