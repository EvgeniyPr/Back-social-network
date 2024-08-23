import { Response } from "express";
import { db } from "../../db/db";
import { OutputVideoModel } from "../models/OutputVideoModel";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { RequestWithParams } from "../../common/models/RequestsModels";
import { GetVideoByURIParamsModel } from "../models/GetVideoByURIParamsModel";

export const getVideoController = (
  req: RequestWithParams<GetVideoByURIParamsModel>,
  res: Response<OutputVideoModel[]>
) => {
  if (!req.params.id) {
    res.status(HTTP_STATUSES.OK_200).json(db.videos);
    return;
  } else {
    const video = db.videos.find((v) => v.id === +req.params.id);
    if (video) {
      res.status(HTTP_STATUSES.OK_200).json(video);
      return;
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  }
};
