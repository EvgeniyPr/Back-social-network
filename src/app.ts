import express from "express";
import cors from "cors";
import { SETTINGS } from "./settings/SETTINGS";
import { videoRouter } from "./routers/videoRouter";
import { db } from "./db/db";
import { HTTP_STATUSES } from "./settings/HTTP_STATUSES/HTTP_STATUSES";
import { blogsRouter } from "./routers/blogsRouter";
import { postsRouter } from "./routers/postsRouter";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(SETTINGS.PASS.VIDEO, videoRouter);
app.use(SETTINGS.PASS.BLOGS, blogsRouter);
app.use(SETTINGS.PASS.POSTS, postsRouter);

app.delete("/testing/all-data", (req, res) => {
  db.videos = [];
  db.posts = [];
  db.blogs = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
