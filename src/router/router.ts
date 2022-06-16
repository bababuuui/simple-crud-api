import { IncomingMessage, ServerResponse } from "http";
import * as UserController from "../controllers/userController";
import { JSON_CONTENT_TYPE } from "../constants/headers";

export async function route(req: IncomingMessage, res: ServerResponse, workerId: number) {
  try {
    console.log(`SERVER ${workerId} ${req.method} ${req.url}`);
    // GET
    if (req.url === "/api/users" && req.method === "GET") {
      await UserController.getUsers(req, res);
    }

    // GET
    else if (req.url.match(/\/api\/users\/\w+/) && req.method === "GET") {
      const id = req.url.split("/")[3];
      await UserController.getUser(req, res, id);
    }

    // POST
    else if (req.url === "/api/users" && req.method === "POST") {
      await UserController.createUser(req, res);
    }

    // PUT
    else if (req.url.match(/\/api\/users\/\w+/) && req.method === "PUT") {
      const id = req.url.split("/")[3];
      await UserController.updateUser(req, res, id);
    }

    // DELETE
    else if (req.url.match(/\/api\/users\/\w+/) && req.method === "DELETE") {
      const id = req.url.split("/")[3];
      await UserController.deleteUser(req, res, id);
    }

    // not existing route
    else {
      res.writeHead(404, JSON_CONTENT_TYPE);
      res.end(JSON.stringify({ message: "Route with such method NOT FOUND" }));
    }
  } catch (e) {
    res.writeHead(500, JSON_CONTENT_TYPE);
    res.end("Oops. Server error");
  }
}
