import { Response } from "express";
import {
  RequestWithBody,
  RequestWithParams,
} from "../../models/requests-models/RequestsModels";
import { UpdateVideoModel } from "../../models/videos-models/UpdateVideoModel";
import { inputValidation } from "../utils/inputValidation";
import { HTTP_STATUSES } from "../../HTTP_STATUSES/HTTP_STATUSES";
import { findIndexVideo } from "../utils/findIndexVideo";
import { GetVideoByURIParamsModel } from "../../models/videos-models/GetVideoByURIParamsModel";
import { db } from "../../db/db";

export const updateVideoController = (
  req: RequestWithBody<UpdateVideoModel> &
    RequestWithParams<GetVideoByURIParamsModel>,
  res: Response
) => {
  const errors = inputValidation(req.body);
  if (errors.errorsMessages.length) {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors);
    return;
  }
  const indexVideoToUpdate = findIndexVideo(req.params.id);
  if (indexVideoToUpdate > -1) {
    db.videos[indexVideoToUpdate] = {
      ...db.videos[indexVideoToUpdate],
      ...req.body,
    };
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
