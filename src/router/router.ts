import { IncomingMessage, ServerResponse } from "http";
import * as UserController from "../controllers/userController";
import * as BaseController from "../controllers/baseController";
import { Routes } from "../constants/Routes";

export async function route(req: IncomingMessage, res: ServerResponse, workerId?: number) {
  try {
    console.log(`SERVER ${workerId || 1} ${req.method} ${req.url}`);

    // without path
    if (req.url === Routes.USERS) {
      if (req.method === "GET") {
        await UserController.getUsers(req, res);
      } else if (req.method === "POST") {
        await UserController.createUser(req, res);
      } else {
        await BaseController.getUnsupportedMethod(req, res);
      }
    }
    // with  extra path id
    else if (req.url.match(/^\/api\/users\/[\w-]+$/)) {
      const id = req.url.split("/")[3];
      if (req.method === "GET") {
        await UserController.getUser(req, res, id);
      } else if (req.method === "PUT") {
        await UserController.updateUser(req, res, id);
      } else if (req.method === "DELETE") {
        await UserController.deleteUser(req, res, id);
      } else {
        await BaseController.getUnsupportedMethod(req, res);
      }
    } else {
      await BaseController.getNotFound(req, res);
    }
  } catch (e) {
    await BaseController.getServerError(req, res);
  }
}
