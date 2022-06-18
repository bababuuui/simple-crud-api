import dotenv from "dotenv";
import cluster from "cluster";
import * as os from "os";
import http from "http";
import { route } from "./router/router";

const port = process.env.PORT || 3000;
const { pid } = process;
if (cluster.isPrimary) {
  dotenv.config();
  const count = process.env.LOAD_BALANCING === "true" ? os.cpus().length : 1;
  console.log(`Master pid ${pid}`);
  console.log(`Starting server instances ${count}`);
  for (let i = 0; i < count; i++) cluster.fork();
} else {
  const { id } = cluster.worker;
  http
    .createServer(async (req, res) => {
      res.setHeader("Process-Id", pid);
      await route(req, res, id);
    })
    .listen(port, () => {
      console.log(`Server instance: ${id}, pid: ${pid}, port: ${port}`);
    });
}
