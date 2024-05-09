import { req } from "./test-helpers";
import { SETTINGS } from "../src/settings";
import { HTTP_STATUSES } from "../src/HTTP_STATUSES/HTTP_STATUSES";
import { setDb } from "../src/db/db";

describe("/videos", () => {
  let newVideo: any;
  test("-GET should get empty array", async () => {
    setDb();
    await req.get(SETTINGS.PASS.VIDEO).expect(HTTP_STATUSES.OK_200, []);
  });

  test("-POST shouldn't create a new video with incorrect data (no title, no author)", async () => {
    const createResponse = await req
      .post(SETTINGS.PASS.VIDEO)
      .send({ title: "test", author: "" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    expect(createResponse.body).toEqual({
      errorsMessages: [{ message: "author is required", field: "author" }],
    });
  });

  test("-POST should create a new video with correct data", async () => {
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
  test("-GET should return the video with correct id", async () => {
    const createResponse = await req
      .get(SETTINGS.PASS.VIDEO + "/" + parseFloat(newVideo.id))
      .expect(HTTP_STATUSES.OK_200);
    expect(createResponse.body).toEqual(newVideo);
  });

  test("-GET shouldn't return video with incorrect id", async () => {
    await req
      .get(SETTINGS.PASS.VIDEO + "/" + 1)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });
  test("-PUT shouldn't update video with incorrect data (no title, no author)", async () => {
    const createResponse = await req
      .put(SETTINGS.PASS.VIDEO + "/" + parseFloat(newVideo.id))
      .send({ title: "", author: "testUpdateAuthor" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);
    expect(createResponse.body).toEqual({
      errorsMessages: [{ message: "title is required", field: "title" }],
    });
  });
  test("-PUT shouldn't update video with incorrect id", async () => {
    await req
      .put(SETTINGS.PASS.VIDEO + "/" + 1)
      .send({ title: "testUpdateTitle", author: "testUpdateAuthor" })
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });
  test("-PUT should update video with correct data", async () => {
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
  test("-DELETE shouldn't delete video with incorrect id", async () => {
    await req
      .delete(SETTINGS.PASS.VIDEO + "/" + 1)
      .expect(HTTP_STATUSES.NOT_FOUND_404);
    const createResponse = await req
      .get(SETTINGS.PASS.VIDEO)
      .expect(HTTP_STATUSES.OK_200);
    expect(createResponse.body.length).toBe(1);
  });
  test("-DELETE should delete video with correct data", async () => {
    await req
      .delete(SETTINGS.PASS.VIDEO + "/" + parseFloat(newVideo.id))
      .expect(HTTP_STATUSES.NO_CONTENT_204);
    await req.get(SETTINGS.PASS.VIDEO).expect(HTTP_STATUSES.OK_200, []);
  });
});
