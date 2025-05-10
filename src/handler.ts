import { IncomingMessage, ServerResponse } from "node:http";
import { RequestMethods, ResponseStatusCodes } from "./helpers/api.helpers.ts";
import { Controller } from "./users/controller.ts";
import { getUserId, USERS_URL_PATTERN } from "./helpers/get.id.ts";
import { error } from "node:console";

const userController = new Controller([]);

const AppHandler = () => {
  return async (request: IncomingMessage, response: ServerResponse) => {
    response.setHeader("Content-Type", "application/json");

    try {
      if (USERS_URL_PATTERN.test(request.url || "")) {
        switch (request.method) {
          case RequestMethods.GET:
            const userId = getUserId(request);
            if (!!userId) {
              return await userController.getUser(request, response);
            }
            return await userController.getUsers(request, response);

          case RequestMethods.POST:
            return await userController.createUser(request, response);

          case RequestMethods.DELETE:
            return await userController.deleteUser(request, response);

          case RequestMethods.PUT:
            return await userController.updateUser(request, response);

          default:
            return response
              .writeHead(ResponseStatusCodes.NOT_FOUND)
              .end(
                JSON.stringify({
                  error: `Method ${request.method} is not supported on this resource`,
                })
              );
        }
      }

      return response
        .writeHead(ResponseStatusCodes.NOT_FOUND)
        .end(JSON.stringify({ error: "This resource is not supported" }));
    } catch {
      return response
        .writeHead(ResponseStatusCodes.INTERNAL_SERVER_ERROR)
        .end(
          JSON.stringify({
            error:
              "An error occurred while processing the request. Try your request again later",
          })
        );
    }
  };
};

export default AppHandler;
