import { IncomingMessage } from "http";
import { CreateUserData } from "../users/users";

type BodyRespose = {
  body: CreateUserData | null;
  error?: string;
};

export const getBody = async (
  request: IncomingMessage
): Promise<BodyRespose> => {
  try {
    const body = await new Promise((resolve, reject) => {
      let body = "";

      request.on("data", (ch) => {
        body += ch;
      });

      request.on("end", () => {
        resolve(body);
      });

      request.on("error", (error) => {
        reject(error);
      });
    });

    return {
      body: JSON.parse(body as string),
    };
  } catch (error) {
    return {
      body: null,
      error: `Invalid body format: ${error}`,
    };
  }
};
