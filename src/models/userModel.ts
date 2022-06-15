import initialDbUsersJSON from "../data/initialDbUsers.json";
import { IUser } from "./IUser";

const users = initialDbUsersJSON as IUser[];

export async function getAllUsers(): Promise<IUser[]> {
  return users;
}

export async function findUserById(id: string): Promise<IUser> {
  return users.find((item) => item.id === id);
}
