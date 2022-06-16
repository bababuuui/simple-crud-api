import http from "http";
import { route } from "./router/router";

export const server = http.createServer(async (req, res) => {
  await route(req, res);
});
