import { IPagination } from "../src/common/models/Pagination";
import { HTTP_STATUSES } from "../src/settings/HTTP_STATUSES/HTTP_STATUSES";
import { SETTINGS } from "../src/settings/settings";
import { UserOutputModelToFront } from "../src/users/models/UserModels";
import { req, responceIsEqualToData } from "./test-helpers";

let usersData: IPagination<UserOutputModelToFront[]> = {
  pagesCount: 0,
  page: 1,
  pageSize: 10,
  totalCount: 0,
  items: [],
};
describe("/users", () => {
  test("-GET should get an empty array", async () => {
    await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, usersData);
      });
  });
  test("-POST shouldn't create a new user with unauthorized (wrong password)", async () => {
    await req
      .post(SETTINGS.PASS.USERS)
      .auth("admin", "wrong password")
      .send({
        login: "testlogin",
        email: "test@mail.com",
        password: "password",
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, usersData);
      });
  });
  test("-POST shouldn't create a new user with unauthorized (wrong username)", async () => {
    await req
      .post(SETTINGS.PASS.USERS)
      .auth("wrong admin", "qwerty")
      .send({
        login: "testlogin",
        email: "test@mail.com",
        password: "password",
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req
      .get(SETTINGS.PASS.USERS)
      .expect(HTTP_STATUSES.OK_200)
      .auth("admin", "qwerty")
      .then((responce) => {
        responceIsEqualToData(responce, usersData);
      });
  });
  test("-POST shouldn't create a new user with invalid field login", async () => {
    await req
      .post(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .send({
        login: "00",
        email: "test@mail.com",
        password: "password",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((responce) => {
        expect(responce.text).toBe(
          '{"errorsMessages":[{"message":"min length is 3, max length is 10","field":"login"}]}'
        );
      });
    await req
      .get(SETTINGS.PASS.USERS)
      .expect(HTTP_STATUSES.OK_200)
      .auth("admin", "qwerty")
      .then((responce) => {
        responceIsEqualToData(responce, usersData);
      });
  });
  test("-POST shouldn't create a new user with invalid field email", async () => {
    await req
      .post(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .send({
        login: "testlogin",
        email: "test",
        password: "password",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((responce) => {
        expect(responce.text).toBe(
          '{"errorsMessages":[{"message":"wrong format email","field":"email"}]}'
        );
      });
    await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, usersData);
      });
  });
  test("-POST shouldn't create a new user with invalid field password", async () => {
    await req
      .post(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .send({
        login: "testlogin",
        email: "test@mail.com",
        password: "000",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((responce) => {
        expect(responce.text).toBe(
          '{"errorsMessages":[{"message":"min length is 6, max length is 20","field":"password"}]}'
        );
      });
    await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, usersData);
      });
  });
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
  test("-POST shouldn't create a new user with non-unique login ", async () => {
    await req
      .post(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .send({
        login: "testlogin",
        email: "testunique@mail.com",
        password: "123456",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)

      .then((responce) => {
        expect(responce.text).toBe(
          '{"errorsMessages":[{"message":"the login is not unique","field":"login"}]}'
        );
      });
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);
    usersData = createRequest.body;
    expect(usersData.items.length).toBe(1);
  });
  test("-POST shouldn't create a new user with non-unique email", async () => {
    await req
      .post(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .send({
        login: "testloginu",
        email: "test@mail.com",
        password: "123456",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)

      .then((responce) => {
        expect(responce.text).toBe(
          '{"errorsMessages":[{"message":"the email is not unique","field":"email"}]}'
        );
      });
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);
    usersData = createRequest.body;
    expect(usersData.items.length).toBe(1);
  });
  test("-DELETE shouldn't delete the user with unauthorized (wrong password)", async () => {
    await req
      .delete(SETTINGS.PASS.USERS + "/" + usersData.items[0].id)
      .auth("admin", "wrong qwerty")
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);
    usersData = createRequest.body;
    expect(usersData.items.length).toBe(1);
  });
  test("-DELETE shouldn't delete the user with unauthorized (wrong username)", async () => {
    await req
      .delete(SETTINGS.PASS.USERS + "/" + usersData.items[0].id)
      .auth("wrong admin", "qwerty")
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);
    usersData = createRequest.body;
    expect(usersData.items.length).toBe(1);
  });
  test("-DELETE shouldn't delete with wrong params id)", async () => {
    await req
      .delete(SETTINGS.PASS.USERS + "/" + "000")
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((responce) => {
        expect(responce.text).toBe(
          '{"errorsMessages":[{"message":"id must be 24 character hex string","field":"id"}]}'
        );
      });
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);
    usersData = createRequest.body;
    expect(usersData.items.length).toBe(1);
  });
  test("-DELETE should delete user by params id)", async () => {
    await req
      .delete(SETTINGS.PASS.USERS + "/" + usersData.items[0].id)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);
    usersData = createRequest.body;
    expect(usersData.items.length).toBe(0);
  });
  test("-POST should create four new users with valid fields ", async () => {
    await req.post(SETTINGS.PASS.USERS).auth("admin", "qwerty").send({
      login: "Dimych",
      email: "dimych@gmail.com",
      password: "123456",
    });
    await req.post(SETTINGS.PASS.USERS).auth("admin", "qwerty").send({
      login: "Natalia",
      email: "kuzyuberdina@gmail.com",
      password: "123456",
    });
    await req.post(SETTINGS.PASS.USERS).auth("admin", "qwerty").send({
      login: "Tom",
      email: "Tom@gmail.com",
      password: "123456",
    });
    await req.post(SETTINGS.PASS.USERS).auth("admin", "qwerty").send({
      login: "Ron",
      email: "Ron@gmail.com",
      password: "123456",
    });
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);

    usersData = createRequest.body;
    expect(usersData.items.length).toBe(4);
    const createRequestWithPagination = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .query({ searchLoginTerm: "D" })
      .query({ searchEmailTerm: "K" })
      .query({ pageNumber: "1" })
      .query({ pageSize: "2" })
      .query({ sortDirection: "asc" });
    expect(createRequestWithPagination.body.pagesCount).toBe(1);
    expect(createRequestWithPagination.body.page).toBe(1);
    expect(createRequestWithPagination.body.pageSize).toBe(2);
    expect(createRequestWithPagination.body.totalCount).toBe(2);
    expect(createRequestWithPagination.body.items[0]).toEqual({
      id: expect.any(String),
      login: "Dimych",
      email: "dimych@gmail.com",
      createdAt: expect.any(String),
    });
  });
});
