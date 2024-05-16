import { Response } from "express";
import { CreateVideoInputModel } from "../models/CreateVideoInputModel";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { RequestWithBody } from "../../models/RequestsModels";
import { inputValidation } from "../validation/inputValidation";
import { createVideo } from "../utils/createVideo";
import { OutputVideoModel } from "../models/OutputVideoModel";
import { APIErrorResult } from "../models/video-error-models/APIErrorResult";

export const createVideoController = (
  req: RequestWithBody<CreateVideoInputModel>,
  res: Response<OutputVideoModel | APIErrorResult>
) => {
  const errors = inputValidation(req.body);
  if (errors.errorsMessages.length) {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors);
    return;
  }
  const newVideo = createVideo(req.body);
  db.videos.push(newVideo);
  res.status(HTTP_STATUSES.CREATED_201).json(newVideo);
};
