import { IncomingMessage, ServerResponse } from "http";
import UserController from "../controllers/userController";

export async function route(req: IncomingMessage, res: ServerResponse) {
  if (req.url === "/api/users" && req.method === "GET") {
    console.log("api/users");
    await UserController.getUsers(req, res);
  } else if (req.url.match(/\/api\/users\/\w+/) && req.method === "GET") {
    console.log("api/users/{id}");
    const id = req.url.split("/")[3];
    await UserController.getUser(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "NOT FOUND" }));
  }
}
