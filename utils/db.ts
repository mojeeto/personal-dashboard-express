import mongoose from "mongoose";
import env from "./env";

export default async function connectToDB() {
  try {
    await mongoose.connect(env.DB_SCHEMA_NAME);
  } catch (err) {
    if (!(err instanceof Error)) {
      console.log("VERY BAD ERROR!");
      process.exit(-1);
    }
    console.log(err.message);
    process.exit(-1);
  }
}
