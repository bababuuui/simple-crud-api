import { IncomingMessage, ServerResponse } from "http";
import { v4 as uuid, validate } from "uuid";
import * as UsersStorage from "../models/userModel";
import { JSON_CONTENT_TYPE } from "../constants/headers";
import { getPostJSONData } from "../utils/requestUtils";
import { isUser } from "../models/IUser";
import { ResponseMessages } from "../constants/ResponseMessages";

export async function getUsers(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const users = await UsersStorage.getAllUsers();
  res.writeHead(200, JSON_CONTENT_TYPE);
  res.end(JSON.stringify(users));
}

export async function getUser(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
  if (validate(id)) {
    const user = await UsersStorage.findUserById(id);
    if (user) {
      res.writeHead(200, JSON_CONTENT_TYPE);
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, JSON_CONTENT_TYPE);
      res.end(ResponseMessages.USER_NOT_FOUND);
    }
  } else {
    res.writeHead(400, JSON_CONTENT_TYPE);
    res.end(ResponseMessages.UUID_IS_NOT_VALID);
  }
}

export async function createUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const body = await getPostJSONData(req);
  if (isUser(body)) {
    const { username, age, hobbies } = body;
    const id = uuid();
    await UsersStorage.addUser({ id, username, age, hobbies });
    res.writeHead(201, JSON_CONTENT_TYPE);
    res.end(
      JSON.stringify({
        message: ResponseMessages.OPERATION_SUCCESSFUL,
        user: { id, username, age, hobbies },
      })
    );
  } else {
    res.writeHead(400, JSON_CONTENT_TYPE);
    res.end(
      JSON.stringify({
        error: ResponseMessages.NOT_ENOUGH_REQUIRED_FIELDS,
      })
    );
  }
}

export async function updateUser(req: IncomingMessage, res: ServerResponse, userId: string): Promise<void> {
  const body = await getPostJSONData(req);
  if (isUser(body) && validate(userId)) {
    if (await UsersStorage.findUserById(userId)) {
      const { username, age, hobbies } = body;
      await UsersStorage.updateUser({ id: userId, username, age, hobbies });
      res.writeHead(200, JSON_CONTENT_TYPE);
      res.end(
        JSON.stringify({
          message: ResponseMessages.OPERATION_SUCCESSFUL,
          user: { userId, username, age, hobbies },
        })
      );
    } else {
      res.writeHead(404, JSON_CONTENT_TYPE);
      res.end(ResponseMessages.USER_NOT_FOUND);
    }
  } else {
    res.writeHead(400, JSON_CONTENT_TYPE);
    res.end(
      JSON.stringify({
        error: `User doesn't have required fields or Id is not valid`,
      })
    );
  }
}

export async function deleteUser(req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
  if (!validate(id)) {
    res.writeHead(400, JSON_CONTENT_TYPE);
    res.end(ResponseMessages.UUID_IS_NOT_VALID);
  } else if (await UsersStorage.findUserById(id)) {
    await UsersStorage.deleteUserById(id);
    res.writeHead(204, JSON_CONTENT_TYPE);
    res.end();
  } else {
    res.writeHead(404, JSON_CONTENT_TYPE);
    res.end(ResponseMessages.USER_NOT_FOUND);
  }
}
