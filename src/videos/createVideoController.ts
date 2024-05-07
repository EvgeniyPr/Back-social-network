import { Request, Response } from "express";
import { CreateVideoModel } from "../models/videos-models/CreateVideoModel";
import { db } from "../db/db";
import { HTTP_STATUSES } from "../HTTP_STATUSES/HTTP_STATUSES";
import { RequestWithBody } from "../models/requests-models/RequestsModels";

export const createVideoController = (
  req: RequestWithBody<CreateVideoModel>,
  res: Response
) => {
  console.log(req.body);
  db.videos.push(req.body);
  res.sendStatus(HTTP_STATUSES.CREATED_201);
};
//Need to add validation in req.body
