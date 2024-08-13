import { Response } from "express";
import {
  RequestWithBody,
  RequestWithParams,
} from "../../common/models/RequestsModels";
import { UpdateVideoInputModel } from "../models/UpdateVideoInputModel";
import { inputValidation } from "../validation/inputValidation";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { GetVideoByURIParamsModel } from "../models/GetVideoByURIParamsModel";
import { db } from "../../db/db";
import { findIndex } from "../../common/utils/findIndex";

export const updateVideoController = (
  req: RequestWithBody<UpdateVideoInputModel> &
    RequestWithParams<GetVideoByURIParamsModel>,
  res: Response
) => {
  const errors = inputValidation(req.body);
  if (errors.errorsMessages.length) {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors);
    return;
  }
  const indexVideoToUpdate = findIndex(req.params.id, db.videos);
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
