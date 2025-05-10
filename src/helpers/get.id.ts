import { IncomingMessage } from "http";

export const USERS_URL_PATTERN = /\/api\/users\/?(\w+)*/;

export const getUserId = (request: IncomingMessage) => {
  const matchedId = request.url?.match(/\/api\/users\/([\w|-]+)/);
  return matchedId && matchedId[1] ? matchedId[1] : "";
};

export const validateId = (userId: string) => {
  const result = !userId
    ? "User id is required"
    : /^[\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}$/i.test(userId)
      ? ""
      : "User id has invalid format.UUID expected";
  return result;
};
