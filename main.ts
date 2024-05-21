import express from "express";
import http from "http";
import env from "./utils/env";
import connectToDB from "./utils/db";

async function main() {
  const app = express();
  const server = http.createServer(app);

  app.use((req, res, next) => {
    console.log("OK");
  });

  await connectToDB();
  server.listen(env.PORT);
}

main();
