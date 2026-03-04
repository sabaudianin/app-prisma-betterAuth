import { betterAuth } from "better-auth";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

// Tworzymy instancję Kysely dla PostgreSQL
const db = new Kysely({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // jeśli AWS RDS wymaga
      },
    }),
  }),
});

export const auth = betterAuth({
  database: db,
});
