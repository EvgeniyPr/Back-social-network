import express from "express";
import cors from "cors";
import { SETTINGS } from "./settings";
import { videoRouter } from "./videos/router";
import { db } from "./db/db";
import { HTTP_STATUSES } from "./HTTP_STATUSES/HTTP_STATUSES";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(SETTINGS.PASS.VIDEO, videoRouter);

app.delete("/testing/all-data", (req, res) => {
  db.videos = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
