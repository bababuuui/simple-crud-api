import initialDbUsersJSON from "../data/initialDbUsers.json";
import { IUser } from "./IUser";

const users = initialDbUsersJSON as IUser[];

function getAllUsers() {
  return new Promise((resolve) => {
    resolve(users);
  });
}

function findUserById(id: string) {
  return new Promise((resolve) => {
    const user = users.find((item) => item.id === id);
    resolve(user);
  });
}

export default { getAllUsers, findUserById };
