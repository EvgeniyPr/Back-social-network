import { Response } from "express";
import { RequestWithParams } from "../../common/models/RequestsModels";
import { GetVideoByURIParamsModel } from "../models/GetVideoByURIParamsModel";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { findIndex } from "../../common/utils/findIndex";

export const deleteVideoController = (
  req: RequestWithParams<GetVideoByURIParamsModel>,
  res: Response
) => {
  const indexVideoToDelete = findIndex(req.params.id, db.videos);
  if (indexVideoToDelete > -1) {
    db.videos.splice(indexVideoToDelete, 1);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
