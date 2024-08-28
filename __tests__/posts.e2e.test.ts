import { BlogsOutputModelToFrontWithPagination } from "../src/blogs/models/BlogOutputModel";
import { PostsOutputModelToFrontWithPagination } from "../src/posts/models/PostOutputModel";
import { HTTP_STATUSES } from "../src/settings/HTTP_STATUSES/HTTP_STATUSES";
import { SETTINGS } from "../src/settings/settings";
import { req, responceIsEqualToData } from "./test-helpers";

describe("/posts", () => {
  let postsData: PostsOutputModelToFrontWithPagination = {
    pagesCount: 0,
    page: 1,
    pageSize: 10,
    totalCount: 0,
    items: [],
  };
  let blogsData: BlogsOutputModelToFrontWithPagination = {
    pagesCount: 0,
    page: 1,
    pageSize: 10,
    totalCount: 0,
    items: [],
  };
  test("-GET should get an empty array", async () => {
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
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

  test("-POST shouldn't create a new post with unauthorized user (wrong password)", async () => {
    await req
      .post(SETTINGS.PASS.POSTS)
      .auth("admin", "wrong qwerty")
      .send({
        title: "test title",
        shortDescription: "test shortDescription",
        content: "test content",
        blogId: blogsData.items[0].id,
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-POST shouldn't create a new post with unauthorized user (wrong username)", async () => {
    await req
      .post(SETTINGS.PASS.POSTS)
      .auth("wrong admin", "qwerty")
      .send({
        title: "test title",
        shortDescription: "test shortDescription",
        content: "test content",
        blogId: blogsData.items[0].id,
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-POST shouldn't create a new post with invalid field title", async () => {
    await req
      .post(SETTINGS.PASS.POSTS)
      .auth("admin", "qwerty")
      .send({
        title: "",
        shortDescription: "test shortDescription",
        content: "test content",
        blogId: blogsData.items[0].id,
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((response) => {
        expect(response.body).toEqual({
          errorsMessages: [{ message: "title is empty", field: "title" }],
        });
      });
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-POST shouldn't create a new post with invalid field shortDescription", async () => {
    await req
      .post(SETTINGS.PASS.POSTS)
      .auth("admin", "qwerty")
      .send({
        title: "title",
        shortDescription: "",
        content: "test content",
        blogId: blogsData.items[0].id,
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((response) => {
        expect(response.body).toEqual({
          errorsMessages: [
            { message: "shortDescription is empty", field: "shortDescription" },
          ],
        });
      });
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-POST shouldn't create a new post with invalid field content", async () => {
    await req
      .post(SETTINGS.PASS.POSTS)
      .auth("admin", "qwerty")
      .send({
        title: "title",
        shortDescription: "shortDescription",
        content: "",
        blogId: blogsData.items[0].id,
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
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
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
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
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
  test("-GET BY PARAMS should return the post by params id", async () => {
    await req
      .get(SETTINGS.PASS.POSTS + "/" + postsData.items[0].id)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        expect(response.body).toEqual({
          id: postsData.items[0].id,
          title: "title",
          shortDescription: "shortDescription",
          content: "content",
          blogId: blogsData.items[0].id,
          blogName: blogsData.items[0].name,
          createdAt: expect.any(String),
        });
      });
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-GET BY PARAMS shouldn't return the post with wrong params id", async () => {
    await req
      .get(SETTINGS.PASS.POSTS + "/" + "0000")
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-PUT shouldn't update the post with wrong params id", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + "11122")
      .auth("admin", "qwerty")
      .send({
        title: "new title",
        shortDescription: "new shortDescription",
        content: "new content",
        blogId: blogsData.items[0].id,
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-PUT shouldn't update the post with wrong password", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + postsData.items[0].id)
      .auth("admin", "wrong qwerty")
      .send({
        title: "new title",
        shortDescription: "new shortDescription",
        content: "new content",
        blogId: blogsData.items[0].id,
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-PUT shouldn't update the post with wrong username", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + postsData.items[0].id)
      .auth("wrong admin", "qwerty")
      .send({
        title: "new title",
        shortDescription: "new shortDescription",
        content: "new content",
        blogId: blogsData.items[0].id,
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-PUT shouldn't update the post with invalid field title", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + postsData.items[0].id)
      .auth("admin", "qwerty")
      .send({
        title: "",
        shortDescription: "new shortDescription",
        content: "new content",
        blogId: blogsData.items[0].id,
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((response) => {
        expect(response.body).toEqual({
          errorsMessages: [{ message: "title is empty", field: "title" }],
        });
      });
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-PUT shouldn't update the post with invalid field shortDescription", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + postsData.items[0].id)
      .auth("admin", "qwerty")
      .send({
        title: "new title",
        shortDescription: "",
        content: "new content",
        blogId: blogsData.items[0].id,
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
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-PUT shouldn't update the post with invalid field content", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + postsData.items[0].id)
      .auth("admin", "qwerty")
      .send({
        title: "new title",
        shortDescription: "new shortDescription",
        content: "",
        blogId: blogsData.items[0].id,
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
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-PUT shouldn't update the post with invalid field blogId", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + postsData.items[0].id)
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
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-PUT should update the post with valid data", async () => {
    await req
      .put(SETTINGS.PASS.POSTS + "/" + postsData.items[0].id)
      .auth("admin", "qwerty")
      .send({
        title: "new title",
        shortDescription: "new shortDescription",
        content: "new content",
        blogId: blogsData.items[0].id,
      })
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        expect(response.body.items[0]).toEqual({
          id: postsData.items[0].id,
          title: "new title",
          shortDescription: "new shortDescription",
          content: "new content",
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
  test("-DELETE shouldn't delete the post with unauthorized user (wrong password)", async () => {
    await req
      .delete(SETTINGS.PASS.POSTS + "/" + postsData.items[0].id)
      .auth("admin", "wrong qwerty")
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-DELETE shouldn't delete the post with unauthorized user (wrong username)", async () => {
    await req
      .delete(SETTINGS.PASS.POSTS + "/" + postsData.items[0].id)
      .auth("wrong admin", "qwerty")
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-DELETE shouldn't delete the post with wrong params id", async () => {
    await req
      .delete(SETTINGS.PASS.POSTS + "/" + "0000")
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, postsData);
      });
  });
  test("-DELETE should delete post by params id", async () => {
    await req
      .delete(SETTINGS.PASS.POSTS + "/" + postsData.items[0].id)
      .auth("admin", "qwerty")
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        expect(responce.body.items.length).toBe(0);
      });
    const createRequest = await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200);
    postsData = createRequest.body;
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
        createdAt: new Date().toISOString(),
      })
      .expect(HTTP_STATUSES.CREATED_201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          websiteUrl: expect.any(String),
          createdAt: expect.any(String),
          isMembership: expect.any(Boolean),
        });
      });
    const createRequest = await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200);
    blogsData = createRequest.body;
    await req
      .get(SETTINGS.PASS.BLOGS)
      .expect(HTTP_STATUSES.OK_200)
      .then((responce) => {
        responceIsEqualToData(responce, blogsData);
      });
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
      .then((response) => {
        expect(response.body).toEqual({
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
      .then((response) => {
        expect(response.body).toEqual({
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
  test("-GET ALL POSTS FOR SPECIFIED BLOG should return all posts", async () => {
    await req
      .get(`${SETTINGS.PASS.BLOGS}/${blogsData.items[0].id}/posts`)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        expect(response.body.items.length).toBe(2);
      });
  });
  test("-GET ALL POSTS FOR SPECIFIED BLOG shouldn't return the post with wrong params id", async () => {
    await req
      .get(`${SETTINGS.PASS.BLOGS}/0000/posts`)
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        expect(response.body.items.length).toBe(2);
      });
  });
  test("-POST NEW POST FOR SPECIFIED BLOG shouldn't create a new post with unauthorized user (wrong password)", async () => {
    await req
      .post(`${SETTINGS.PASS.BLOGS}/${blogsData.items[0].id}/posts`)
      .auth("admin", "wrong qwerty")
      .send({
        title: "test title",
        shortDescription: "test shortDescription",
        content: "test content",
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        expect(response.body.items.length).toBe(2);
      });
  });
  test("-POST NEW POST FOR SPECIFIED BLOG shouldn't create a new post if specified blog doesn't exists", async () => {
    await req
      .post(`${SETTINGS.PASS.BLOGS}/66980da79147a5632259f956/posts`)
      .auth("admin", "qwerty")
      .send({
        title: "test title",
        shortDescription: "test shortDescription",
        content: "test content",
      })
      .expect(HTTP_STATUSES.NOT_FOUND_404);
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        expect(response.body.items.length).toBe(2);
      });
  });
  test("-POST NEW POST FOR SPECIFIED BLOG shouldn't create a new post with unauthorized user (wrong username)", async () => {
    await req
      .post(`${SETTINGS.PASS.BLOGS}/${blogsData.items[0].id}/posts`)
      .auth("wrong admin", "qwerty")
      .send({
        title: "test title",
        shortDescription: "test shortDescription",
        content: "test content",
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401);
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        expect(response.body.items.length).toBe(2);
      });
  });

  test("-POST NEW POST FOR SPECIFIED BLOG shouldn't create a new post with invalid field title", async () => {
    await req
      .post(`${SETTINGS.PASS.BLOGS}/${blogsData.items[0].id}/posts`)
      .auth("admin", "qwerty")
      .send({
        title: "",
        shortDescription: "test shortDescription",
        content: "test content",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((response) => {
        expect(response.body).toEqual({
          errorsMessages: [{ message: "title is empty", field: "title" }],
        });
      });
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        expect(response.body.items.length).toBe(2);
      });
  });

  test("-POST NEW POST FOR SPECIFIED BLOG shouldn't create a new post with invalid field shortDescription", async () => {
    await req
      .post(`${SETTINGS.PASS.BLOGS}/${blogsData.items[0].id}/posts`)
      .auth("admin", "qwerty")
      .send({
        title: "title",
        shortDescription: "",
        content: "test content",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
      .then((response) => {
        expect(response.body).toEqual({
          errorsMessages: [
            { message: "shortDescription is empty", field: "shortDescription" },
          ],
        });
      });
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        expect(response.body.items.length).toBe(2);
      });
  });
  test("-POST NEW POST FOR SPECIFIED BLOG shouldn't create a new post with invalid field content", async () => {
    await req
      .post(`${SETTINGS.PASS.BLOGS}/${blogsData.items[0].id}/posts`)
      .auth("admin", "qwerty")
      .send({
        title: "title",
        shortDescription: "shortDescription",
        content: "",
        blogId: blogsData.items[0].id,
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
    await req
      .get(SETTINGS.PASS.POSTS)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        expect(response.body.items.length).toBe(2);
      });
  });

  test("-POST NEW POST FOR SPECIFIED BLOG should create a new post with valid data", async () => {
    await req
      .post(`${SETTINGS.PASS.BLOGS}/${blogsData.items[0].id}/posts`)
      .auth("admin", "qwerty")
      .send({
        title: "title",
        shortDescription: "shortDescription",
        content: "content",
      })
      .expect(HTTP_STATUSES.CREATED_201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(String),
          title: "title",
          shortDescription: "shortDescription",
          content: "content",
          blogId: blogsData.items[0].id,
          blogName: blogsData.items[0].name,
          createdAt: expect.any(String),
        });
      });
    await req
      .get(`${SETTINGS.PASS.BLOGS}/${blogsData.items[0].id}/posts`)
      .expect(HTTP_STATUSES.OK_200)
      .then((response) => {
        expect(response.body.items.length).toBe(3);
      });
  });
});
