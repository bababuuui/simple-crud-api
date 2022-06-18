export interface IUser {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

export function isUser(obj: any): obj is IUser {
  return "username" in obj && "age" in obj && "hobbies" in obj;
}
