import dotenv from "dotenv";
import * as http from "http";
import { route } from "./router/router";

dotenv.config();

console.log(process.env.MY_VAR1);

const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  await route(req, res);
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
