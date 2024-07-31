import { HTTP_STATUSES } from "../src/settings/HTTP_STATUSES/HTTP_STATUSES";
import { SETTINGS } from "../src/settings/settings";
import { UsersOutputModelToFrontWithPagination } from "../src/users/models/UserModels";
import { req } from "./test-helpers";

let usersData: UsersOutputModelToFrontWithPagination = {
  pagesCount: 0,
  page: 1,
  pageSize: 10,
  totalCount: 0,
  items: [],
};
describe("/user/login", () => {
  test("-POST should create a new user with valid fields", async () => {
    await req
      .post(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .send({
        login: "testlogin",
        email: "test@mail.com",
        password: "123456",
      })
      .expect(HTTP_STATUSES.CREATED_201)
      .then((responce) => {
        expect(responce.body).toEqual({
          id: expect.any(String),
          login: "testlogin",
          email: "test@mail.com",
          createdAt: expect.any(String),
        });
      });
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);
    usersData = createRequest.body;
    expect(usersData.items.length).toBe(1);
  });
  test("-POST should return error with not valid field loginOrEmail", async () => {
    await req
      .post(SETTINGS.PASS.AUTH + "/login")
      .send({ loginOrEmail: "", password: "123456" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((responce) => {
        expect(responce.text).toBe(
          '{"errorsMessages":[{"message":"loginOrEmail is empty","field":"loginOrEmail"}]}'
        );
      });
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);
    usersData = createRequest.body;
    expect(usersData.items.length).toBe(1);
  });
  test("-POST should return error with not valid field password", async () => {
    await req
      .post(SETTINGS.PASS.AUTH + "/login")
      .send({ loginOrEmail: "testlogin", password: "" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((responce) => {
        expect(responce.text).toBe(
          '{"errorsMessages":[{"message":"password is empty","field":"password"}]}'
        );
      });
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);
    usersData = createRequest.body;
    expect(usersData.items.length).toBe(1);
  });
  test("-POST should return responce unauthorized_401 with wrong login", async () => {
    await req
      .post(SETTINGS.PASS.AUTH + "/login")
      .send({ loginOrEmail: "wrong", password: "123456" })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);
    usersData = createRequest.body;
    expect(usersData.items.length).toBe(1);
  });
  test("-POST should return responce unauthorized_401 with wrong password", async () => {
    await req
      .post(SETTINGS.PASS.AUTH + "/login")
      .send({ loginOrEmail: "testlogin", password: "wrongpassword" })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);
    usersData = createRequest.body;
    expect(usersData.items.length).toBe(1);
  });
  test("-POST should return responce no_content_204 with valid loginOrEmail and password", async () => {
    await req
      .post(SETTINGS.PASS.AUTH + "/login")
      .send({ loginOrEmail: "test@mail.com", password: "123456" })
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);
    usersData = createRequest.body;
    expect(usersData.items.length).toBe(1);
  });
});
