import express from "express";
import cors from "cors";
import path from "path";
import favicon from "serve-favicon";
import { SETTINGS } from "./settings/settings";
import { videoRouter } from "./routers/videoRouter";
import { HTTP_STATUSES } from "./settings/HTTP_STATUSES/HTTP_STATUSES";
import { blogsRouter } from "./routers/blogsRouter";
import { postsRouter } from "./routers/postsRouter";
import { blogCollection, postCollection, userCollection } from "./db/mongo-db";
import { usersRouter } from "./routers/usersRouter";
import { authRouter } from "./routers/authRouter";
// import { commentsRouter } from "./routers/commentsRouter";

export const app = express();

app.use(express.json());
app.use(cors());

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(SETTINGS.PASS.VIDEO, videoRouter);
app.use(SETTINGS.PASS.BLOGS, blogsRouter);
app.use(SETTINGS.PASS.POSTS, postsRouter);
app.use(SETTINGS.PASS.USERS, usersRouter);
app.use(SETTINGS.PASS.AUTH, authRouter);
// app.use(SETTINGS.PASS.COMMENTS, commentsRouter);
app.delete("/testing/all-data", async (req, res) => {
  blogCollection.deleteMany({});
  postCollection.deleteMany({});
  userCollection.deleteMany({});

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
