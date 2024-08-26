import { AccessTokenModel } from "../src/auth/models/AccessTokenModel";
import { BlogsOutputModelToFrontWithPagination } from "../src/blogs/models/BlogOutputModel";
import { PostsOutputModelToFrontWithPagination } from "../src/posts/models/PostOutputModel";
import { HTTP_STATUSES } from "../src/settings/HTTP_STATUSES/HTTP_STATUSES";
import { SETTINGS } from "../src/settings/settings";
import { UsersOutputModelToFrontWithPagination } from "../src/users/models/UserModels";
import { req, responceIsEqualToData } from "./test-helpers";

describe("", () => {
  let blogsData: BlogsOutputModelToFrontWithPagination = {
    pagesCount: 0,
    page: 1,
    pageSize: 10,
    totalCount: 0,
    items: [],
  };
  let postsData: PostsOutputModelToFrontWithPagination = {
    pagesCount: 0,
    page: 1,
    pageSize: 10,
    totalCount: 0,
    items: [],
  };
  let token: AccessTokenModel;
  let usersData: UsersOutputModelToFrontWithPagination;
  let comments;
  test("-POST should create a new blog with valid data", async () => {
    await req
      .post(SETTINGS.PASS.BLOGS)
      .auth("admin", "qwerty")
      .send({
        name: "test name",
        description: "description",
        websiteUrl:
          "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA9",
        createdAt: new Date().toISOString(),
      })
      .expect(HTTP_STATUSES.CREATED_201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          websiteUrl: expect.any(String),
          isMembership: expect.any(Boolean),
          createdAt: expect.any(String),
        });
      });
    const createRequest = await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200);
    blogsData = createRequest.body;
  });
  test("-POST should create a new post with valid data", async () => {
    await req
      .post(SETTINGS.PASS.POSTS)
      .auth("admin", "qwerty")
      .send({
        title: "title",
        shortDescription: "shortDescription",
        content: "content",
        blogId: blogsData.items[0].id,
      })
      .expect(HTTP_STATUSES.CREATED_201)
      .then((responce) => {
        expect(responce.body).toEqual({
          id: expect.any(String),
          title: "title",
          shortDescription: "shortDescription",
          content: "content",
          blogId: blogsData.items[0].id,
          blogName: blogsData.items[0].name,
          createdAt: expect.any(String),
        });
      });
    const createRequest = await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200);
    postsData = createRequest.body;
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-POST should create a new user with valid fields", async () => {
    await req
      .post(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .send({
        login: "testlogin2",
        email: "test2@mail.com",
        password: "1234567",
      })
      .expect(HTTP_STATUSES.CREATED_201)
      .then((responce) => {
        expect(responce.body).toEqual({
          id: expect.any(String),
          login: "testlogin2",
          email: "test2@mail.com",
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
  test("-POST should return token and responce OK_200 with valid password and login", async () => {
    const loginResponce = await req
      .post(SETTINGS.PASS.AUTH + "/login")
      .send({ loginOrEmail: "testlogin2", password: "1234567" })
      .expect(HTTP_STATUSES.OK_200);
    expect(loginResponce.body).toEqual({ accessToken: expect.any(String) });
    token = loginResponce.body;
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);
    usersData = createRequest.body;
    expect(usersData.items.length).toBe(1);
  });
  test("-POST should return responce unauthorized_401 with wrong token", async () => {
    await req
      .post(`${SETTINGS.PASS.POSTS}/${postsData.items[0]}/comments`)
      .set("Authorization", `Bearer wrongToken`)
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
  });
  test("-POST should return responce BAD_REQUEST_400 with wrong not valid id", async () => {
    await req
      .post(`${SETTINGS.PASS.POSTS}/000/comments`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
  });
  test("-POST should return responce NOT_FOUND_404 if post with specified postId doesn't exists", async () => {
    await req
      .post(`${SETTINGS.PASS.POSTS}/000000000000000000000000/comments`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });
  test("-POST should return responce BAD_REQUEST_400 with not valid field content", async () => {
    await req
      .post(`${SETTINGS.PASS.POSTS}/${postsData.items[0].id}/comments`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({ content: "tooshort" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
  });
  test("-POST should create and return new comment", async () => {
    const responceNewComment = await req
      .post(`${SETTINGS.PASS.POSTS}/${postsData.items[0].id}/comments`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({ content: "This is a new test conmment" })
      .expect(HTTP_STATUSES.CREATED_201);
    expect(responceNewComment.body).toEqual({
      id: expect.any(String),
      content: "This is a new test conmment",
      commentatorInfo: {
        userId: expect.any(String),
        userLogin: expect.any(String),
      },
      createdAt: expect.any(String),
    });
  });
});
