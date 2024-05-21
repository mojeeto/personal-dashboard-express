import express from "express";
import http from "http";
import env from "./utils/env";
import connectToDB from "./utils/db";
import router from "./routes";

async function main() {
  const app = express();
  const server = http.createServer(app);

  // main router
  app.use(router);

  await connectToDB();
  server.listen(env.PORT);
}

main();
