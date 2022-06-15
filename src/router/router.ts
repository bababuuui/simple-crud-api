import { IncomingMessage, ServerResponse } from "http";
import * as UserController from "../controllers/userController";

export async function route(req: IncomingMessage, res: ServerResponse) {
  try {
    // GET
    if (req.url === "/api/users" && req.method === "GET") {
      console.log("api/users");
      await UserController.getUsers(req, res);
    } else if (req.url.match(/\/api\/users\/\w+/) && req.method === "GET") {
      console.log("api/users/{id}");
      const id = req.url.split("/")[3];
      await UserController.getUser(req, res, id);
    }
    // POST
    else if (req.url === "/api/users" && req.method === "POST") {
      await UserController.createUser(req, res);
    }
    // not existing route
    else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "NOT FOUND" }));
    }
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}
