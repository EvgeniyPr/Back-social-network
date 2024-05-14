import { Response } from "express";
import { RequestWithParams } from "../../models/requests-models/RequestsModels";
import { GetVideoByURIParamsModel } from "../../models/videos-models/GetVideoByURIParamsModel";
import { findIndexVideo } from "../utils/findIndexVideo";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const deleteVideoController = (
  req: RequestWithParams<GetVideoByURIParamsModel>,
  res: Response
) => {
  const indexVideoToDelete = findIndexVideo(req.params.id);
  if (indexVideoToDelete > -1) {
    db.videos.splice(indexVideoToDelete, 1);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
