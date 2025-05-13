import { afterAll, describe, expect, test } from "@jest/globals";
import { server } from "../app.ts";
import request from "supertest";
import { UPDATED_USER_DATA, USER_DATA, USERS_URL } from "./helpers.ts";
import { ResponseStatusCodes } from "../helpers/api.helpers.ts";
import { User } from "../users/users.ts";

describe("basic tests", () => {
  let userId: string;

  test("get empty array of users", async () => {
    const response = await request(server).get(USERS_URL);

    expect(response.status).toBe(ResponseStatusCodes.OK);
    expect(response.body).toStrictEqual([]);
  });

  test("create a user", async () => {
    const response = await request(server).post(USERS_URL).send(USER_DATA);
    expect(response.status).toBe(ResponseStatusCodes.CREATED);
    const { id, ...rest } = response.body;
    userId = id;
    expect(rest).toStrictEqual(USER_DATA);
  });

  test("get a user", async () => {
    const response = await request(server).get(`${USERS_URL}${userId}`);

    expect(response.status).toBe(ResponseStatusCodes.OK);
    const { id, ...rest } = response.body as User;
    expect(rest).toStrictEqual(USER_DATA);
  });

  test("update a user", async () => {
    const response = await request(server)
      .put(`${USERS_URL}${userId}`)
      .send(UPDATED_USER_DATA);

    expect(response.status).toBe(ResponseStatusCodes.OK);
    const { id, ...rest } = response.body as User;
    expect(rest).toEqual(UPDATED_USER_DATA);
  });

  test("get updated user", async () => {
    const response = await request(server).get(`${USERS_URL}${userId}`);

    expect(response.status).toBe(ResponseStatusCodes.OK);
    const { id, ...rest } = response.body as User;
    expect(rest).toStrictEqual(UPDATED_USER_DATA);
  });

  test("delete a user", async () => {
    const response = await request(server).delete(`${USERS_URL}${userId}`);

    expect(response.status).toBe(ResponseStatusCodes.NO_CONTENT);
  });

  test("receive not found for deleted user", async () => {
    const response = await request(server).get(`${USERS_URL}${userId}`);

    expect(response.status).toBe(ResponseStatusCodes.NOT_FOUND);
  });

  afterAll((done) => {
    server.close();
    done();
  });
});
