import { IUser } from "./IUser";

let users = [] as IUser[];

export async function getAllUsers(): Promise<IUser[]> {
  return users;
}

export async function findUserById(id: string): Promise<IUser> {
  return users.find((item) => item.id === id);
}

export async function addUser(user: IUser): Promise<void> {
  users.push(user);
}
export async function updateUser(user: IUser): Promise<void> {
  users.map((item, index) => {
    if (item.id === user.id) {
      users[index] = user;
    }
    return item;
  });
}

export async function deleteUserById(id: string): Promise<void> {
  users = users.filter((item) => item.id !== id);
}
