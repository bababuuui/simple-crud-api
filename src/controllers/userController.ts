import { IncomingMessage, ServerResponse } from "http";
import * as uuid from "uuid";
import Users from "../models/userModel";
import { JSON_CONTENT_TYPE } from "../constants/headers";

export async function getUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = await Users.getAllUsers();
    res.writeHead(200, JSON_CONTENT_TYPE);
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    if (uuid.validate(id)) {
      const user = await Users.findUserById(id);
      if (user) {
        res.writeHead(200, JSON_CONTENT_TYPE);
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, JSON_CONTENT_TYPE);
        res.end("User not found");
      }
    } else {
      res.writeHead(400, JSON_CONTENT_TYPE);
      res.end("userId is invalid (not uuid)");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(req: IncomingMessage, res: ServerResponse) {
  // try {
  //   const users = await Users.getAllUsers();
  //   res.writeHead(200, JSON_CONTENT_TYPE);
  //   res.end(JSON.stringify(users));
  // } catch (error) {
  //   console.log(error);
  // }
}
