process.env.PORT = "4002";
import { afterAll, describe, expect, test } from "@jest/globals";
import { server } from "../app.ts";
import request from "supertest";
import { UPDATED_USER_DATA, USER_DATA, USERS_URL } from "./helpers.ts";
import { ResponseStatusCodes } from "../helpers/api.helpers.ts";
import { User } from "../users/users.ts";
describe('test',() =>{
  const newUsers = [
    { username: 'user1',
      age: 31,
      hobbies: ['gaming'],
    },{
      username: 'user2',
      age: 32,
      hobbies: ['walking'],
    },{
      username: 'user3',
      age: 33,
      hobbies: [], },
  ]
let userIds: String[] = [];
describe.each(newUsers)('($a$action$b)', ({username, age, hobbies}) => {
  test("create users ", async () => {
    const response = await request(server).post(USERS_URL).send({username, age, hobbies});
        expect(response.status).toBe(ResponseStatusCodes.CREATED);
        const { id } = response.body;
        const userId1 = id;
        userIds.push(userId1);
  });
})
  test('check count users', async () => {
    const response = await request(server).get(USERS_URL);
   
    expect(response.status).toBe(ResponseStatusCodes.OK);
    expect(response.body).toHaveLength(3);
  });
  test('delete one user', async () => {
    const userId = userIds[2]
    const response = await request(server).delete(`${USERS_URL}${userId}`)

    expect(response.status).toBe(ResponseStatusCodes.NO_CONTENT);
  });
  test('check new count users', async () => {
    const response = await request(server).get(USERS_URL);

    expect(response.status).toBe(ResponseStatusCodes.OK);
    expect(response.body).toHaveLength(2);
  })
  afterAll((done) => {
    server.close();
    done();
  });
});