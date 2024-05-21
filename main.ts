import express from "express";
import http from "http";

async function main() {
  const app = express();
  const server = http.createServer(app);

  app.use((req, res, next) => {
    console.log("OK");
  });

  server.listen(8080);
}

main();
