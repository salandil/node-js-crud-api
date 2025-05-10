process.env.PORT = "4001";
import { afterAll, describe, expect, test } from "@jest/globals";
import { server } from "../app.ts"
import request from "supertest";
import { UPDATED_USER_DATA, USER_DATA, USER_NOT_FOUND_ID, USERS_URL } from "./helpers.ts";
import { ResponseStatusCodes } from "../helpers/api.helpers.ts";
import { CreateUserData, User } from "../users/users.ts";

describe("Users validation tests", () => {
  test("should receive not found for requesting non-existing user", async () => {
    const res = await request(server).get(
      `${USERS_URL}${USER_NOT_FOUND_ID}`
    );
    expect(res.status).toBe(ResponseStatusCodes.NOT_FOUND);
  });

  test("should receive not found for updating non-existing user", async () => {
    const res = await request(server)
      .put(`${USERS_URL}${USER_NOT_FOUND_ID}`)
      .send(UPDATED_USER_DATA);
    expect(res.status).toBe(ResponseStatusCodes.NOT_FOUND);
  });

  test("should receive not found for deleting non-existing user", async () => {
    const res = await request(server).delete(
      `${USERS_URL}${USER_NOT_FOUND_ID}`
    );
    expect(res.status).toBe(ResponseStatusCodes.NOT_FOUND);
  });

  test("should receive bad request for creating user with insufficient data", async () => {
    const insufficientUserData = { ...USER_DATA, username: undefined } as Partial<CreateUserData>;
    const res = await request(server)
      .post(`${USERS_URL}`)
      .send(insufficientUserData);
    expect(res.status).toBe(ResponseStatusCodes.BAD_REQUEST);
  });

  test("should receive bad request for creating user with invalid data", async () => {
    const invalidUserData = { ...USER_DATA, username: 100500 };

    const res = await request(server)
      .post(`${USERS_URL}`)
      .send(invalidUserData);
    expect(res.status).toBe(ResponseStatusCodes.BAD_REQUEST);
  });

  afterAll((done) => {
    server.close();
    done();
  });
});
