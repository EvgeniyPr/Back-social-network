import { Response } from "express";
import { InputVideoModel } from "../models/videos-models/InputVideoModel";
import { db } from "../db/db";
import { HTTP_STATUSES } from "../HTTP_STATUSES/HTTP_STATUSES";
import { RequestWithBody } from "../models/requests-models/RequestsModels";
import { inputValidation } from "./utils/inputValidation";

export const createVideoController = (
  req: RequestWithBody<InputVideoModel>,
  res: Response
) => {
  const errors = inputValidation(req.body);
  if (errors.errorsMessages.length) {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors);
  }
  db.videos.push(req.body);
  res.sendStatus(HTTP_STATUSES.CREATED_201);
};
//Need to add validation in req.body
