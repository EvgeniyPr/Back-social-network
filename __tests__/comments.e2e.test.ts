import { AccessTokenModel } from "../src/auth/models/AccessTokenModel";
import { BlogOutputModelToFront } from "../src/blogs/models/BlogOutputModel";
import { CommentOutputModelToFront } from "../src/comments/models/CommenOutputModel";
import { IPagination } from "../src/common/models/Pagination";
import { PostOutputModelToFront } from "../src/posts/models/PostOutputModel";
import { HTTP_STATUSES } from "../src/settings/HTTP_STATUSES/HTTP_STATUSES";
import { SETTINGS } from "../src/settings/settings";
import { UserOutputModelToFront } from "../src/users/models/UserModels";
import { req, responceIsEqualToData } from "./test-helpers";

describe("", () => {
  let blogsData: IPagination<BlogOutputModelToFront[]> = {
    pagesCount: 0,
    page: 1,
    pageSize: 10,
    totalCount: 0,
    items: [],
  };
  let postsData: IPagination<PostOutputModelToFront[]> = {
    pagesCount: 0,
    page: 1,
    pageSize: 10,
    totalCount: 0,
    items: [],
  };
  let token: AccessTokenModel;
  let usersData: IPagination<UserOutputModelToFront[]>;
  let comments: IPagination<CommentOutputModelToFront[]>;
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
  test("-POST should create and return new comment", async () => {
    const responceNewComment = await req
      .post(`${SETTINGS.PASS.POSTS}/${postsData.items[0].id}/comments`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({ content: "This is a new test conmment_2" })
      .expect(HTTP_STATUSES.CREATED_201);
    expect(responceNewComment.body).toEqual({
      id: expect.any(String),
      content: "This is a new test conmment_2",
      commentatorInfo: {
        userId: expect.any(String),
        userLogin: expect.any(String),
      },
      createdAt: expect.any(String),
    });
  });
  test("-POST should create and return new comment", async () => {
    const responceNewComment = await req
      .post(`${SETTINGS.PASS.POSTS}/${postsData.items[0].id}/comments`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({ content: "This is a new test conmment_3" })
      .expect(HTTP_STATUSES.CREATED_201);
    expect(responceNewComment.body).toEqual({
      id: expect.any(String),
      content: "This is a new test conmment_3",
      commentatorInfo: {
        userId: expect.any(String),
        userLogin: expect.any(String),
      },
      createdAt: expect.any(String),
    });
  });
  test("-POST should create and return new comment", async () => {
    const responceNewComment = await req
      .post(`${SETTINGS.PASS.POSTS}/${postsData.items[0].id}/comments`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({ content: "This is a new test conmment_4" })
      .expect(HTTP_STATUSES.CREATED_201);
    expect(responceNewComment.body).toEqual({
      id: expect.any(String),
      content: "This is a new test conmment_4",
      commentatorInfo: {
        userId: expect.any(String),
        userLogin: expect.any(String),
      },
      createdAt: expect.any(String),
    });
  });
  test("-POST should create and return new comment", async () => {
    const responceNewComment = await req
      .post(`${SETTINGS.PASS.POSTS}/${postsData.items[0].id}/comments`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({ content: "This is a new test conmment_5" })
      .expect(HTTP_STATUSES.CREATED_201);
    expect(responceNewComment.body).toEqual({
      id: expect.any(String),
      content: "This is a new test conmment_5",
      commentatorInfo: {
        userId: expect.any(String),
        userLogin: expect.any(String),
      },
      createdAt: expect.any(String),
    });
  });
  test("-GET should should return responce NOT_FOUND_404 because post for passed postId doesn't exist", async () => {
    await req
      .get(`${SETTINGS.PASS.POSTS}/000000000000000000000000/comments`)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });
  test("-GET should should return comments for post with pagination", async () => {
    const responceComments = await req
      .get(`${SETTINGS.PASS.POSTS}/${postsData.items[0].id}/comments`)
      .expect(HTTP_STATUSES.OK_200);
    expect(responceComments.body).toEqual({
      pagesCount: 1,
      page: 1,
      pageSize: 10,
      totalCount: 5,
      items: [
        {
          id: expect.any(String),
          content: "This is a new test conmment_5",
          commentatorInfo: expect.any(Object),
          createdAt: expect.any(String),
        },
        {
          id: expect.any(String),
          content: "This is a new test conmment_4",
          commentatorInfo: expect.any(Object),
          createdAt: expect.any(String),
        },
        {
          id: expect.any(String),
          content: "This is a new test conmment_3",
          commentatorInfo: expect.any(Object),
          createdAt: expect.any(String),
        },
        {
          id: expect.any(String),
          content: "This is a new test conmment_2",
          commentatorInfo: expect.any(Object),
          createdAt: expect.any(String),
        },
        {
          id: expect.any(String),
          content: "This is a new test conmment",
          commentatorInfo: expect.any(Object),
          createdAt: expect.any(String),
        },
      ],
    });
  });
  test("-GET should should return comments for post with pagination", async () => {
    const responceComments = await req
      .get(
        `${SETTINGS.PASS.POSTS}/${postsData.items[0].id}${SETTINGS.PASS.COMMENTS}`
      )
      .query({ sortDirection: "asc" })
      .expect(HTTP_STATUSES.OK_200);
    comments = responceComments.body;
    expect(responceComments.body).toEqual({
      pagesCount: 1,
      page: 1,
      pageSize: 10,
      totalCount: 5,
      items: [
        {
          id: expect.any(String),
          content: "This is a new test conmment",
          commentatorInfo: expect.any(Object),
          createdAt: expect.any(String),
        },
        {
          id: expect.any(String),
          content: "This is a new test conmment_2",
          commentatorInfo: expect.any(Object),
          createdAt: expect.any(String),
        },
        {
          id: expect.any(String),
          content: "This is a new test conmment_3",
          commentatorInfo: expect.any(Object),
          createdAt: expect.any(String),
        },
        {
          id: expect.any(String),
          content: "This is a new test conmment_4",
          commentatorInfo: expect.any(Object),
          createdAt: expect.any(String),
        },
        {
          id: expect.any(String),
          content: "This is a new test conmment_5",
          commentatorInfo: expect.any(Object),
          createdAt: expect.any(String),
        },
      ],
    });
    comments = responceComments.body;
  });
  test("-GET should return comment by id", async () => {
    const responceComment = await req
      .get(`${SETTINGS.PASS.COMMENTS}/${comments.items[0].id}`)
      .expect(HTTP_STATUSES.OK_200);
    expect(responceComment.body).toEqual({
      id: expect.any(String),
      content: "This is a new test conmment",
      commentatorInfo: {
        userId: expect.any(String),
        userLogin: expect.any(String),
      },
      createdAt: expect.any(String),
    });
  });
  test("-GET should return responce NOT_FOUND_404 because comment with such id doesn't exist", async () => {
    await req
      .get(`${SETTINGS.PASS.COMMENTS}/000000000000000000000000`)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  test("-DELETE should return responce UNAUTHORIZED_401 with wrong token", async () => {
    await req
      .delete(`${SETTINGS.PASS.COMMENTS}/${comments.items[0].id}`)
      .set("Authorization", `Bearer wrong_token`)
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    const commentAfterDel = await req.get(
      `${SETTINGS.PASS.POSTS}/${postsData.items[0].id}/comments`
    );
    comments = commentAfterDel.body;
    expect(comments.items.length).toBe(5);
  });

  test("-DELETE should return responce NOT_FOUND_404 if comment with such id doesn't exist", async () => {
    await req
      .delete(`${SETTINGS.PASS.COMMENTS}/000000000000000000000000`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
    const commentAfterDel = await req.get(
      `${SETTINGS.PASS.POSTS}/${postsData.items[0].id}/comments`
    );
    comments = commentAfterDel.body;
    expect(comments.items.length).toBe(5);
  });
  test("-DELETE should delete comment", async () => {
    await req
      .delete(`${SETTINGS.PASS.COMMENTS}/${comments.items[0].id}`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    const commentAfterDel = await req.get(
      `${SETTINGS.PASS.POSTS}/${postsData.items[0].id}/comments`
    );
    comments = commentAfterDel.body;
    expect(comments.items.length).toBe(4);
  });
  test("-DELETE should return responce FORBIDDEN_403 if try delete the comment that is not your own", async () => {
    await req
      .post(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .send({
        login: "testlogin3",
        email: "test3@mail.com",
        password: "1234567",
      })
      .expect(HTTP_STATUSES.CREATED_201)
      .then((responce) => {
        expect(responce.body).toEqual({
          id: expect.any(String),
          login: "testlogin3",
          email: "test3@mail.com",
          createdAt: expect.any(String),
        });
      });
    const newUserToken = await req
      .post(SETTINGS.PASS.AUTH + "/login")
      .send({ loginOrEmail: "testlogin3", password: "1234567" })
      .expect(HTTP_STATUSES.OK_200);
    expect(newUserToken.body).toEqual({ accessToken: expect.any(String) });
    token = newUserToken.body;
    const createRequest = await req
      .get(SETTINGS.PASS.USERS)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.OK_200);
    usersData = createRequest.body;
    expect(usersData.items.length).toBe(2);
    await req
      .delete(`${SETTINGS.PASS.COMMENTS}/${comments.items[0].id}`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .expect(HTTP_STATUSES.FORBIDDEN_403);
    const commentAfterDel = await req.get(
      `${SETTINGS.PASS.POSTS}/${postsData.items[0].id}/comments`
    );
    comments = commentAfterDel.body;
    expect(comments.items.length).toBe(4);
  });
  test("-PUT should return responce FORBIDDEN_403 if try edit the comment that is not your own", async () => {
    await req
      .put(`${SETTINGS.PASS.COMMENTS}/${comments.items[0].id}`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({ content: "edited stringstringstringst" })
      .expect(HTTP_STATUSES.FORBIDDEN_403);
    const comment = await req.get(
      `${SETTINGS.PASS.COMMENTS}/${comments.items[0].id}`
    );
    expect(comment.body).toEqual({
      id: expect.any(String),
      content: "This is a new test conmment_4",
      commentatorInfo: {
        userId: expect.any(String),
        userLogin: "testlogin2",
      },
      createdAt: expect.any(String),
    });
  });
  test("-PUT should return responce UNAUTHORIZED_401 when token is not valid", async () => {
    const logInUser2 = await req
      .post(SETTINGS.PASS.AUTH + "/login")
      .send({ loginOrEmail: "testlogin2", password: "1234567" })
      .expect(HTTP_STATUSES.OK_200);
    expect(logInUser2.body).toEqual({ accessToken: expect.any(String) });
    token = logInUser2.body;
    await req
      .put(`${SETTINGS.PASS.COMMENTS}/${comments.items[0].id}`)
      .set("Authorization", `Bearer wrongToken`)
      .send({ content: "edited stringstringstringst" })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    const comment = await req.get(
      `${SETTINGS.PASS.COMMENTS}/${comments.items[0].id}`
    );
    expect(comment.body).toEqual({
      id: expect.any(String),
      content: "This is a new test conmment_4",
      commentatorInfo: {
        userId: expect.any(String),
        userLogin: "testlogin2",
      },
      createdAt: expect.any(String),
    });
  });

  test("-PUT should return responce NOT_FOUND_404 when comment id doesn't exist", async () => {
    await req
      .put(`${SETTINGS.PASS.COMMENTS}/000000000000000000000000`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({ content: "edited stringstringstringst" })
      .expect(HTTP_STATUSES.NOT_FOUND_404);
    const comment = await req.get(
      `${SETTINGS.PASS.COMMENTS}/${comments.items[0].id}`
    );
    expect(comment.body).toEqual({
      id: expect.any(String),
      content: "This is a new test conmment_4",
      commentatorInfo: {
        userId: expect.any(String),
        userLogin: "testlogin2",
      },
      createdAt: expect.any(String),
    });
  });
  test("-PUT should return responce BAD_REQUEST_400 when comment comments field is not valid", async () => {
    await req
      .put(`${SETTINGS.PASS.COMMENTS}/${comments.items[0].id}`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({ content: "to short" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    const comment = await req.get(
      `${SETTINGS.PASS.COMMENTS}/${comments.items[0].id}`
    );
    expect(comment.body).toEqual({
      id: expect.any(String),
      content: "This is a new test conmment_4",
      commentatorInfo: {
        userId: expect.any(String),
        userLogin: "testlogin2",
      },
      createdAt: expect.any(String),
    });
  });
  test("-PUT should return responce NO_CONTENT_204 when edit comment", async () => {
    await req
      .put(`${SETTINGS.PASS.COMMENTS}/${comments.items[0].id}`)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({ content: "This is a edit conmment_4" })
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    const comment = await req.get(
      `${SETTINGS.PASS.COMMENTS}/${comments.items[0].id}`
    );
    expect(comment.body).toEqual({
      id: expect.any(String),
      content: "This is a edit conmment_4",
      commentatorInfo: {
        userId: expect.any(String),
        userLogin: "testlogin2",
      },
      createdAt: expect.any(String),
    });
  });
});
