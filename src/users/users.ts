import { ResponseStatusCodes } from "../helpers/api.helpers.ts";
import { v4 as uuidv4 } from "uuid";

export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type CreateUserData = {
  username: string;
  age: number;
  hobbies: string[];
};

export class Users {
  #users: User[] = [];
  constructor(users: User[] = []) {
    this.#users = users;
  }

  getUsers() {
    return {
      responseStatus: ResponseStatusCodes.OK,
      users: this.#users,
    };
  }

  getUser(id: string) {
    const user = this.#users.find((user) => user.id === id);
    if (!user) {
      return {
        responseStatus: ResponseStatusCodes.NOT_FOUND,
        user: null,
      };
    }
    return {
      responseStatus: ResponseStatusCodes.OK,
      user,
    };
  }

  createUser(data: CreateUserData) {
    const createdUser = {
      ...data,
      id: uuidv4(),
    };

    this.#users.push(createdUser);
    return {
      responseStatus: ResponseStatusCodes.CREATED,
      user: createdUser,
    };
  }

  deleteUser(id: string) {
    const userIndex = this.#users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return {
        responseStatus: ResponseStatusCodes.NOT_FOUND,
      };
    }
    this.#users.splice(userIndex, 1);
    return {
      responseStatus: ResponseStatusCodes.NO_CONTENT,
    };
  }

  updateUser(id: string, newData: CreateUserData) {
    const userIndex = this.#users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return {
        responseStatus: ResponseStatusCodes.NOT_FOUND,
        user: null,
      };
    }
    const updatedUser = {
      id,
      ...newData,
    };
    this.#users[userIndex] = updatedUser;
    return {
      responseStatus: ResponseStatusCodes.OK,
      user: updatedUser,
    };
  }
}
