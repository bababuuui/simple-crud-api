import axios from "axios";
import * as http from "http";
import { Server } from "http";
import { JSON_CONTENT_TYPE } from "../constants/headers";
import { Routes } from "../constants/Routes";

import { IUser } from "../models/IUser";
import { route } from "../router/router";

const PORT = 5555;

const instance = axios.create({
  baseURL: `http://localhost:${PORT}/`,
  headers: JSON_CONTENT_TYPE,
  validateStatus: (status) => true,
});

let server: Server;

beforeAll(async () => {
  server = http
    .createServer(async (req, res) => {
      await route(req, res);
    })
    .listen(PORT, () => {});
});

const getUserSample = (): IUser => {
  return {
    username: "test1",
    age: 32,
    hobbies: ["js", "kek"],
  };
};

describe("User creation", function () {
  test("Can add user", async () => {
    const user = getUserSample();
    // when
    const createUserResponse = await instance.post(Routes.USERS, user);
    // then
    expect(createUserResponse.status).toEqual(201);
    expect(createUserResponse.data.user.id).toBeDefined();
    user.id = createUserResponse.data.user.id;
    expect(createUserResponse.data.user).toEqual(user);
    const getUserResponse = await instance.get<IUser>(`${Routes.USERS}/${user.id}`);
    expect(getUserResponse.status).toEqual(200);
    expect(getUserResponse.data).toEqual(user);
  });

  test("Can not add user without all required fields", async () => {
    const user = getUserSample();
    delete user.username;
    // when
    const createUserResponse = await instance.post(Routes.USERS, user);
    // then
    expect(createUserResponse.status).toEqual(400);
  });
});

describe("User mutation", function () {
  test("Can delete users", async () => {
    // given
    const user = getUserSample();
    const createUserResponse = await instance.post(Routes.USERS, user);
    expect(createUserResponse.status).toEqual(201);
    user.id = createUserResponse.data.user.id;
    // when
    const deleteUserResponse = await instance.delete<IUser>(`${Routes.USERS}/${user.id}`);

    // then
    expect(deleteUserResponse.status).toEqual(204);

    const getUserResponse = await instance.get<IUser>(`${Routes.USERS}/${user.id}`);
    expect(getUserResponse.status).toEqual(404);
  });

  test("Can update users", async () => {
    // given
    const user = getUserSample();
    const createUserResponse = await instance.post(Routes.USERS, user);
    expect(createUserResponse.status).toEqual(201);
    // when
    const updatedUser: IUser = {
      username: "updated1",
      age: 12,
      hobbies: ["java", "guitar"],
      id: createUserResponse.data.user.id,
    };

    const updateUserResponse = await instance.put<IUser>(`${Routes.USERS}/${updatedUser.id}`, updatedUser);
    // then
    expect(updateUserResponse.status).toEqual(200);
    const getUserResponse = await instance.get<IUser>(`${Routes.USERS}/${updatedUser.id}`);
    expect(getUserResponse.status).toEqual(200);
    expect(getUserResponse.data).toEqual(updatedUser);
  });
});

afterAll(async () => {
  server.close();
});
