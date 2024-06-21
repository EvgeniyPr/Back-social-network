import { BlogOutputModelToFront } from "../src/blogs/models/BlogOutputModel";
import { PostOutputModelToFront } from "../src/posts/models/PostOutputModel";
import { HTTP_STATUSES } from "../src/settings/HTTP_STATUSES/HTTP_STATUSES";
import { SETTINGS } from "../src/settings/SETTINGS";
import { req } from "./test-helpers";

describe("/posts", () => {
  let blogs: BlogOutputModelToFront[];
  let posts: PostOutputModelToFront[];
  test("-GET should get an empty array", async () => {
    await req.get(SETTINGS.PASS.POSTS).expect(HTTP_STATUSES.OK_200, []);
  });
  test("-POST should create a new blog with valid data", async () => {
    await req
      .post(SETTINGS.PASS.BLOGS)
      .auth("admin", "qwerty")
      .send({
        name: "name",
        description: "description",
        websiteUrl:
          "https://CRtXHiQcztBWNLaYHLMk2GCFcFO6VCTxAi_uV_NE433I.jJawuDHgUt.t4dzLhgZ_q0QRlIITs-_.6Lm4HLxV8JDKsA9",
      })
      .expect(HTTP_STATUSES.CREATED_201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          websiteUrl: expect.any(String),
        });
      });
    const createRequest = await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200);
    blogs = createRequest.body;
    expect(blogs.length === 1);
  });

  test("-POST shouldn't create a new post with unauthorized user (wrong password)", async () => {
    await req
      .post(SETTINGS.PASS.POSTS)
      .auth("admin", "wrong qwerty")
      .send({
        title: "test title",
        shortDescription: "test shortDescription",
        content: "test content",
        blogId: blogs[0].id,
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req.get(SETTINGS.PASS.POSTS).expect(HTTP_STATUSES.OK_200, []);
  });
  test("-POST shouldn't create a new post with unauthorized user (wrong username)", async () => {
    await req
      .post(SETTINGS.PASS.POSTS)
      .auth("wrong admin", "qwerty")
      .send({
        title: "test title",
        shortDescription: "test shortDescription",
        content: "test content",
        blogId: blogs[0].id,
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req.get(SETTINGS.PASS.POSTS).expect(HTTP_STATUSES.OK_200, []);
  });
  test("-POST shouldn't create a new post with invalid field title", async () => {
    await req
      .post(SETTINGS.PASS.POSTS)
      .auth("admin", "qwerty")
      .send({
        title: "",
        shortDescription: "test shortDescription",
        content: "test content",
        blogId: blogs[0].id,
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((response) => {
        expect(response.body).toEqual({
          errorsMessages: [{ message: "title is empty", field: "title" }],
        });
      });
    await req.get(SETTINGS.PASS.POSTS).expect(HTTP_STATUSES.OK_200, []);
  });
  test("-POST shouldn't create a new post with invalid field shortDescription", async () => {
    await req
      .post(SETTINGS.PASS.POSTS)
      .auth("admin", "qwerty")
      .send({
        title: "title",
        shortDescription: "",
        content: "test content",
        blogId: blogs[0].id,
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((response) => {
        expect(response.body).toEqual({
          errorsMessages: [
            { message: "shortDescription is empty", field: "shortDescription" },
          ],
        });
      });
    await req.get(SETTINGS.PASS.POSTS).expect(HTTP_STATUSES.OK_200, []);
  });
  test("-POST shouldn't create a new post with invalid field content", async () => {
    await req
      .post(SETTINGS.PASS.POSTS)
      .auth("admin", "qwerty")
      .send({
        title: "title",
        shortDescription: "shortDescription",
        content: "",
        blogId: blogs[0].id,
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((response) => {
        expect(response.body).toEqual({
          errorsMessages: [
            {
              message: "content is empty",
              field: "content",
            },
          ],
        });
      });
    await req.get(SETTINGS.PASS.POSTS).expect(HTTP_STATUSES.OK_200, []);
  });
  test("-POST shouldn't create a new post without blogId", async () => {
    await req
      .post(SETTINGS.PASS.POSTS)
      .auth("admin", "qwerty")
      .send({
        title: "title",
        shortDescription: "shortDescription",
        content: "content",
        blogId: "000000000000000000000000",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((response) => {
        expect(response.body).toEqual({
          errorsMessages: [
            {
              message: "There are no blogs with such id",
              field: "blogId",
            },
          ],
        });
      });
    await req.get(SETTINGS.PASS.POSTS).expect(HTTP_STATUSES.OK_200, []);
  });
  test("-POST should create a new post without valid data", async () => {
    await req
      .post(SETTINGS.PASS.POSTS)
      .auth("admin", "qwerty")
      .send({
        title: "title",
        shortDescription: "shortDescription",
        content: "content",
        blogId: blogs[0].id,
      })
      .expect(HTTP_STATUSES.CREATED_201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(String),
          title: "title",
          shortDescription: "shortDescription",
          content: "content",
          blogId: blogs[0].id,
          blogName: blogs[0].name,
        });
      });
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        posts = response.body;
        expect(response.body.length === 1);
      });
  });
  test("-GET BY PARAMS should return the post by params id", async () => {
    await req
      .get(SETTINGS.PASS.POSTS + "/" + posts[0].id)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        expect(response.body).toEqual({
          id: posts[0].id,
          title: "title",
          shortDescription: "shortDescription",
          content: "content",
          blogId: blogs[0].id,
          blogName: blogs[0].name,
        });
      });
    const createRequest = await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200);
    posts = createRequest.body;
    expect(posts.length === 1);
  });
  test("-GET BY PARAMS shouldn't return the post with wrong params id", async () => {
    await req
      .get(SETTINGS.PASS.POSTS + "/" + "0000")
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    const createRequest = await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200);
    posts = createRequest.body;
    expect(posts.length === 1);
  });
  test("-PUT shouldn't update the post with wrong params id", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + "11122")
      .auth("admin", "qwerty")
      .send({
        title: "new title",
        shortDescription: "new shortDescription",
        content: "new content",
        blogId: blogs[0].id,
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    const createRequest = await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200);
    posts = createRequest.body;
    expect(posts.length === 1);
  });
  test("-PUT shouldn't update the post with wrong password", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + posts[0].id)
      .auth("admin", "wrong qwerty")
      .send({
        title: "new title",
        shortDescription: "new shortDescription",
        content: "new content",
        blogId: blogs[0].id,
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    const createRequest = await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200);
    posts = createRequest.body;
    expect(posts.length === 1);
  });
  test("-PUT shouldn't update the post with wrong username", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + posts[0].id)
      .auth("wrong admin", "qwerty")
      .send({
        title: "new title",
        shortDescription: "new shortDescription",
        content: "new content",
        blogId: blogs[0].id,
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    const createRequest = await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200);
    posts = createRequest.body;
    expect(posts.length === 1);
  });
  test("-PUT shouldn't update the post with invalid field title", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + posts[0].id)
      .auth("admin", "qwerty")
      .send({
        title: "",
        shortDescription: "new shortDescription",
        content: "new content",
        blogId: blogs[0].id,
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((response) => {
        expect(response.body).toEqual({
          errorsMessages: [{ message: "title is empty", field: "title" }],
        });
      });
    const createRequest = await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200);
    posts = createRequest.body;
    expect(posts.length === 1);
  });
  test("-PUT shouldn't update the post with invalid field shortDescription", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + posts[0].id)
      .auth("admin", "qwerty")
      .send({
        title: "new title",
        shortDescription: "",
        content: "new content",
        blogId: blogs[0].id,
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((response) => {
        expect(response.body).toEqual({
          errorsMessages: [
            {
              message: "shortDescription is empty",
              field: "shortDescription",
            },
          ],
        });
      });
    const createRequest = await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200);
    posts = createRequest.body;
    expect(posts.length === 1);
  });
  test("-PUT shouldn't update the post with invalid field content", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + posts[0].id)
      .auth("admin", "qwerty")
      .send({
        title: "new title",
        shortDescription: "new shortDescription",
        content: "",
        blogId: blogs[0].id,
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((response) => {
        expect(response.body).toEqual({
          errorsMessages: [
            {
              message: "content is empty",
              field: "content",
            },
          ],
        });
      });
    const createRequest = await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200);
    posts = createRequest.body;
    expect(posts.length === 1);
  });
  test("-PUT shouldn't update the post with invalid field blogId", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + posts[0].id)
      .auth("admin", "qwerty")
      .send({
        title: "new title",
        shortDescription: "new shortDescription",
        content: "new content",
        blogId: "000000000000000000000000",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((response) => {
        expect(response.body).toEqual({
          errorsMessages: [
            {
              message: "There are no blogs with such id",
              field: "blogId",
            },
          ],
        });
      });
    const createRequest = await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200);
    posts = createRequest.body;
    expect(posts.length === 1);
  });
  test("-PUT should update the post with valid data", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + posts[0].id)
      .auth("admin", "qwerty")
      .send({
        title: "new title",
        shortDescription: "new shortDescription",
        content: "new content",
        blogId: blogs[0].id,
      })
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    const createRequest = await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        expect(response.body[0]).toEqual({
          id: posts[0].id,
          title: "new title",
          shortDescription: "new shortDescription",
          content: "new content",
          blogId: blogs[0].id,
          blogName: blogs[0].name,
        });
      });
  });
  test("-DELETE shouldn't delete the post with unauthorized user (wrong password)", async () => {
    await req
      .delete(SETTINGS.PASS.POSTS + "/" + posts[0].id)
      .auth("admin", "wrong qwerty")
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req.get(SETTINGS.PASS.POSTS).expect(HTTP_STATUSES.OK_200);
    expect(posts.length === 1);
  });
  test("-DELETE shouldn't delete the post with unauthorized user (wrong username)", async () => {
    await req
      .delete(SETTINGS.PASS.POSTS + "/" + posts[0].id)
      .auth("wrong admin", "qwerty")
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req.get(SETTINGS.PASS.POSTS).expect(HTTP_STATUSES.OK_200);
    expect(posts.length === 1);
  });
  test("-DELETE shouldn't delete the post with wrong params id", async () => {
    await req
      .delete(SETTINGS.PASS.POSTS + "/" + "0000")
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await req.get(SETTINGS.PASS.POSTS).expect(HTTP_STATUSES.OK_200);
    expect(blogs.length === 1);
  });
  test("-DELETE should delete post by params id", async () => {
    await req
      .delete(SETTINGS.PASS.POSTS + "/" + posts[0].id)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    await req.get(SETTINGS.PASS.POSTS).expect(HTTP_STATUSES.OK_200);
    expect(blogs.length === 0);
  });
});
