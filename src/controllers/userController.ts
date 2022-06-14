import { IncomingMessage, ServerResponse } from "http";
import Users from "../models/userModel";

async function getUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = await Users.getAllUsers();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

async function getUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    const user = await Users.findUserById(id);
    if (user) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end("User not found");
    }
  } catch (error) {
    console.log(error);
  }
}

export default { getUsers, getUser };
