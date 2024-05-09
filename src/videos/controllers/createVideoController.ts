import { Response } from "express";
import { createVideoModel } from "../../models/videos-models/CreateVideoModel";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../HTTP_STATUSES/HTTP_STATUSES";
import { RequestWithBody } from "../../models/requests-models/RequestsModels";
import { inputValidation } from "../utils/inputValidation";
import { createVideo } from "../utils/createVideo";
import { OutputVideoModel } from "../../models/videos-models/OutputVideoModel";
import { APIErrorResult } from "../../models/videos-models/video-error-models/ErrorCreateVideoType";

export const createVideoController = (
  req: RequestWithBody<createVideoModel>,
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
