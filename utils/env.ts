import dotenv from "dotenv";
dotenv.config({ path: process.cwd() + "/.env.local" });

import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  PORT: str(),

  DB_URL: str(),
  DB_SCHEMA_NAME: str(),

  JWT_TOKEN_SECRET: str(),
});

export default env;
