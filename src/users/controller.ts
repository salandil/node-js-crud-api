import { ResponseStatusCodes } from "../helpers/api.helpers.ts";
import { getBody } from "../helpers/get.body.ts";
import { getUserId, validateId } from "../helpers/get.id.ts";
import { validateBody } from "../helpers/validate.user.ts";
import { CreateUserData, User, Users } from "./users.ts";
import { IncomingMessage, ServerResponse } from "node:http";

export class Controller {
  userRepo: Users;

  constructor(users: User[] = []) {
    this.userRepo = new Users(users);
  }

  async getUsers(_: IncomingMessage, response: ServerResponse) {
    const result = this.userRepo.getUsers();
    return response
      .writeHead(result.responseStatus)
      .end(JSON.stringify(result.users));
  }

  async createUser(request: IncomingMessage, response: ServerResponse) {
    const { body, error } = await getBody(request);
    if (!body) {
      return response
        .writeHead(ResponseStatusCodes.BAD_REQUEST)
        .end(JSON.stringify({ error: error || "Invalid body format" }));
    }

    const bodyErrors = validateBody(body);
    if (bodyErrors.length) {
      return response
        .writeHead(ResponseStatusCodes.BAD_REQUEST)
        .end(JSON.stringify({ error: bodyErrors }));
    }

    const result = this.userRepo.createUser(body);
    return response
      .writeHead(result.responseStatus)
      .end(JSON.stringify(result.user));
  }

  async getUser(request: IncomingMessage, response: ServerResponse) {
    const userId = getUserId(request);
    const error = validateId(userId);
    if (!!error) {
      return response
        .writeHead(ResponseStatusCodes.BAD_REQUEST)
        .end(JSON.stringify({ error }));
    }
    const result = this.userRepo.getUser(userId);
    if (result.responseStatus === ResponseStatusCodes.NOT_FOUND) {
      return response
        .writeHead(result.responseStatus)
        .end(
          JSON.stringify({ error: `User with id '${userId}' is not found` })
        );
    }
    return response
      .writeHead(result.responseStatus)
      .end(JSON.stringify(result.user));
  }

  async deleteUser(request: IncomingMessage, response: ServerResponse) {
    const userId = getUserId(request);
    const error = validateId(userId);
    if (!!error) {
      return response
        .writeHead(ResponseStatusCodes.BAD_REQUEST)
        .end(JSON.stringify({ error }));
    }
    const result = this.userRepo.deleteUser(userId);
    if (result.responseStatus === ResponseStatusCodes.NOT_FOUND) {
      return response
        .writeHead(result.responseStatus)
        .end(
          JSON.stringify({ error: `User with id '${userId}' is not found` })
        );
    }
    return response.writeHead(result.responseStatus).end();
  }

  async updateUser(request: IncomingMessage, response: ServerResponse) {
    const userId = getUserId(request);
    const errorValidation = validateId(userId);
    if (!!errorValidation) {
      return response
        .writeHead(ResponseStatusCodes.BAD_REQUEST)
        .end(JSON.stringify({ error: errorValidation }));
    }

    const { body, error } = await getBody(request);
    if (!body) {
      return response
        .writeHead(ResponseStatusCodes.BAD_REQUEST)
        .end(JSON.stringify({ error: error || "Invalid body format" }));
    }

    const bodyErrors = validateBody(body);
    if (bodyErrors.length) {
      return response
        .writeHead(ResponseStatusCodes.BAD_REQUEST)
        .end(JSON.stringify({ error: bodyErrors }));
    }

    const result = this.userRepo.updateUser(userId, body);
    if (result.responseStatus === ResponseStatusCodes.NOT_FOUND) {
      return response
        .writeHead(result.responseStatus)
        .end(
          JSON.stringify({ error: `User with id '${userId}' is not found` })
        );
    }
    return response
      .writeHead(result.responseStatus)
      .end(JSON.stringify(result.user));
  }
}
