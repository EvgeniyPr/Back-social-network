import { BlogOutputModelToFront } from "../src/blogs/models/BlogOutputModel";
import { HTTP_STATUSES } from "../src/settings/HTTP_STATUSES/HTTP_STATUSES";
import { SETTINGS } from "../src/settings/settings";

import { req } from "./test-helpers";

describe("/blogs", () => {
  let blogs: BlogOutputModelToFront[];

  test("-GET should get an empty array", async () => {
    await req.get(SETTINGS.PASS.BLOGS).expect(HTTP_STATUSES.OK_200, []);
  });
  test("-POST shouldn't create a new blog with unauthorized user (wrong password)", async () => {
    await req
      .post(SETTINGS.PASS.BLOGS)
      .auth("admin", "wrong password")
      .send({
        name: "test name",
        description: "test description",
        websiteUrl:
          "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA9",
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req.get(SETTINGS.PASS.BLOGS).expect(HTTP_STATUSES.OK_200, []);
  });
  test("-POST shouldn't create a new blog with unauthorized user (wrong username)", async () => {
    await req
      .post(SETTINGS.PASS.BLOGS)
      .auth("wrong admin", "qwerty")
      .send({
        name: "test name",
        description: "test description",
        websiteUrl:
          "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA9",
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req.get(SETTINGS.PASS.BLOGS).expect(HTTP_STATUSES.OK_200, []);
  });
  test("-POST shouldn't create a new blog with invalid field name", async () => {
    await req
      .post(SETTINGS.PASS.BLOGS)
      .auth("admin", "qwerty")
      .send({
        name: "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
        description: "test description",
        websiteUrl:
          "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA9",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await req.get(SETTINGS.PASS.BLOGS).expect(HTTP_STATUSES.OK_200, []);
  });
  test("-POST shouldn't create a new blog with invalid field description", async () => {
    await req
      .post(SETTINGS.PASS.BLOGS)
      .auth("admin", "qwerty")
      .send({
        name: "name",
        description: "",
        websiteUrl:
          "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA9",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await req.get(SETTINGS.PASS.BLOGS).expect(HTTP_STATUSES.OK_200, []);
  });
  test("-POST shouldn't create a new blog with invalid format websiteUrl", async () => {
    await req
      .post(SETTINGS.PASS.BLOGS)
      .auth("admin", "qwerty")
      .send({
        name: "name",
        description: "description",
        websiteUrl: "websiteUrl",
        isMembership: false,
        createdAt: new Date().toISOString(),
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await req.get(SETTINGS.PASS.BLOGS).expect(HTTP_STATUSES.OK_200, []);
  });
  test("-POST should create a new blog with valid data", async () => {
    await req
      .post(SETTINGS.PASS.BLOGS)
      .auth("admin", "qwerty")
      .send({
        name: "nameblog",
        description: "descriptionblog",
        websiteUrl:
          "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA9",
        isMembership: false,
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
    blogs = createRequest.body;
    expect(blogs.length === 1);
  });
  test("-GET BY PARAMS should return the blog by params id", async () => {
    await req
      .get(SETTINGS.PASS.BLOGS + "/" + blogs[0].id)
      .expect(HTTP_STATUSES.OK_200)
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
    blogs = createRequest.body;
    expect(blogs.length === 1);
  });
  test("-GET BY PARAMS shouldn't return the blog with wrong params id", async () => {
    await req
      .get(SETTINGS.PASS.BLOGS + "/" + "12323")
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    const createRequest = await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200);
    blogs = createRequest.body;
    expect(blogs.length === 1);
  });
  test("-PUT shouldn't update the blog with wrong params id", async () => {
    await req
      .put(SETTINGS.PASS.BLOGS + "/" + "11122")
      .auth("admin", "qwerty")
      .send({
        name: "name",
        description: "description",
        websiteUrl:
          "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA9",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    const createRequest = await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200);
    blogs = createRequest.body;
    expect(blogs.length === 1);
  });
  test("-PUT shouldn't update the blog with wrong username", async () => {
    await req
      .put(SETTINGS.PASS.BLOGS + "/" + blogs[0].id)
      .auth("wrong admin", "qwerty")
      .send({
        name: "name",
        description: "description",
        websiteUrl:
          "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA9",
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    const createRequest = await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200);
    blogs = createRequest.body;
    expect(blogs.length === 1);
  });
  test("-PUT shouldn't update the blog with wrong password", async () => {
    await req
      .put(SETTINGS.PASS.BLOGS + "/" + blogs[0].id)
      .auth("admin", "wrong qwerty")
      .send({
        name: "name",
        description: "description",
        websiteUrl:
          "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA9",
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    const createRequest = await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200);
    blogs = createRequest.body;
    expect(blogs.length === 1);
  });
  test("-PUT shouldn't update the blog with invalid field name", async () => {
    await req
      .put(SETTINGS.PASS.BLOGS + "/" + blogs[0].id)
      .auth("admin", "qwerty")
      .send({
        name: "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
        description: "description",
        websiteUrl:
          "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA9",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    const createRequest = await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200);
    blogs = createRequest.body;
    expect(blogs.length === 1);
  });
  test("-PUT shouldn't update the blog with invalid field description", async () => {
    await req
      .put(SETTINGS.PASS.BLOGS + "/" + blogs[0].id)
      .auth("admin", "qwerty")
      .send({
        name: "name",
        description: "",
        websiteUrl:
          "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA9",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    const createRequest = await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200);
    blogs = createRequest.body;
    expect(blogs.length === 1);
  });
  test("-PUT shouldn't update the blog with invalid format websiteUrl", async () => {
    await req
      .put(SETTINGS.PASS.BLOGS + "/" + blogs[0].id)
      .auth("admin", "qwerty")
      .send({
        name: "name",
        description: "description",
        websiteUrl: "websiteUrl",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    const createRequest = await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200);
    blogs = createRequest.body;
    expect(blogs.length === 1);
  });
  test("-PUT should update the blog with valid data", async () => {
    await req
      .put(SETTINGS.PASS.BLOGS + "/" + blogs[0].id)
      .auth("admin", "qwerty")
      .send({
        name: "new name",
        description: "new description",
        websiteUrl:
          "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA8",
      })
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    await req
      .get(SETTINGS.PASS.BLOGS + "/" + blogs[0].id)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        expect(response.body).toEqual({
          id: blogs[0].id,
          name: "new name",
          description: "new description",
          websiteUrl:
            "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA8",
          isMembership: expect.any(Boolean),
          createdAt: expect.any(String),
        });
      });
  });
  test("-DELETE shouldn't delete the blog with unauthorized user (wrong password)", async () => {
    await req
      .delete(SETTINGS.PASS.BLOGS + "/" + blogs[0].id)
      .auth("admin", "wrong qwerty")
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    const createRequest = await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200);
    blogs = createRequest.body;
    expect(blogs.length === 1);
  });
  test("-DELETE shouldn't delete the blog with unauthorized user (wrong username)", async () => {
    await req
      .delete(SETTINGS.PASS.BLOGS + "/" + blogs[0].id)
      .auth("wrong admin", "qwerty")
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    const createRequest = await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200);
    blogs = createRequest.body;
    expect(blogs.length === 1);
  });
  test("-DELETE shouldn't delete with wrong params id", async () => {
    await req
      .delete(SETTINGS.PASS.BLOGS + "/" + "0000")
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    const createRequest = await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200);
    blogs = createRequest.body;
    expect(blogs.length === 1);
  });
  test("-DELETE should delete blog by params id", async () => {
    await req
      .delete(SETTINGS.PASS.BLOGS + "/" + blogs[0].id)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    const createRequest = await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200);
    blogs = createRequest.body;
    expect(blogs.length === 0);
  });
});
