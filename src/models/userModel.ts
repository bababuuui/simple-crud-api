import initialDbUsersJSON from "../data/initialDbUsers.json";
import { IUser } from "./IUser";

const users = initialDbUsersJSON as IUser[];

async function getAllUsers() {
  return users;
}

async function findUserById(id: string) {
  return users.find((item) => item.id === id);
}

export default { getAllUsers, findUserById };
