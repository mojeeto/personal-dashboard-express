import dotenv from "dotenv";
dotenv.config({ path: process.cwd() + "/.env.local" });

import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  PORT: str(),

  DB_SCHEMA_NAME: str(),
});

export default env;
