import express from "express";
import http from "http";
import env from "./utils/env";
import connectToDB from "./utils/db";
import router from "./routes";
import cors from "cors";

async function main() {
  const app = express();
  const server = http.createServer(app);

  app.use(cors());
  app.use(express.json());
  // main router
  app.use(router);

  await connectToDB();
  server.listen(env.PORT);
}

main();
