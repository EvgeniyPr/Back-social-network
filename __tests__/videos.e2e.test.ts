import { req } from "./test-helpers";
import { SETTINGS } from "../src/settings";
import { HTTP_STATUSES } from "../src/HTTP_STATUSES/HTTP_STATUSES";
import { setDb } from "../src/db/db";

describe("/videos", () => {
  let newVideo: any;
  test("should get empty array", async () => {
    setDb();
    await req.get(SETTINGS.PASS.VIDEO).expect(HTTP_STATUSES.OK_200, []);
  });

  test("shouldn't create a new object with incorrect request", async () => {
    await req
      .post(SETTINGS.PASS.VIDEO)
      .send({ title: "test", author: "" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
  });

  test("should create a new object", async () => {
    await req
      .post(SETTINGS.PASS.VIDEO)
      .send({ title: "test1", author: "test1" })
      .expect(HTTP_STATUSES.CREATED_201);
    const createResponse = await req.get(SETTINGS.PASS.VIDEO);

    newVideo = createResponse.body[0];
    console.log("createResponse", newVideo);
    expect(newVideo).toEqual({
      id: expect.any(Number),
      title: expect.any(String),
      author: expect.any(String),
      canBeDownloaded: expect.anything(),
      minAgeRestriction: null,
      createdAt: expect.any(String),
      publicationDate: expect.any(String),
      availableResolutions: expect.any(Array),
    });
  });
  test("should return video by id param", async () => {
    const createResponse = await req
      .get(SETTINGS.PASS.VIDEO + "/" + parseFloat(newVideo.id))
      .expect(HTTP_STATUSES.OK_200);
    expect(createResponse.body).toEqual(newVideo);
  });

  test("shouldn't return video with id param that not exist", async () => {
    await req
      .get(SETTINGS.PASS.VIDEO + "/" + 1)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });
  test("shouldn't update video with incorrect request", async () => {
    await req
      .put(SETTINGS.PASS.VIDEO + "/" + parseFloat(newVideo.id))
      .send({ title: "testUpdateTitle", author: "" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
  });
  test("shouldn't update video with id param that not exist", async () => {
    await req
      .put(SETTINGS.PASS.VIDEO + "/" + 1)
      .send({ title: "testUpdateTitle", author: "testUpdateAuthor" })
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });
  test("should update video with correct data", async () => {
    await req
      .put(SETTINGS.PASS.VIDEO + "/" + parseFloat(newVideo.id))
      .send({ title: "testUpdateTitle", author: "testUpdateAuthor" })
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    const createResponse = await req
      .get(SETTINGS.PASS.VIDEO + "/" + parseFloat(newVideo.id))
      .expect(HTTP_STATUSES.OK_200);
    newVideo = createResponse.body;
    expect(newVideo.title).toBe("testUpdateTitle");
    expect(newVideo.author).toBe("testUpdateAuthor");
  });
  test("shouldn't delete video with id param that not exist", async () => {
    await req
      .delete(SETTINGS.PASS.VIDEO + "/" + 1)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });
  test("should delete video by id param", async () => {
    await req
      .delete(SETTINGS.PASS.VIDEO + "/" + parseFloat(newVideo.id))
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    await req.get(SETTINGS.PASS.VIDEO).expect(HTTP_STATUSES.OK_200, []);
  });
});
