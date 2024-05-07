import { Response, Request } from "express";
import { db } from "../db/db";
import { OutputVideoType } from "../models/videos-models/OutputVideoModel";
import { HTTP_STATUSES } from "../HTTP_STATUSES/HTTP_STATUSES";
import { RequestWithParams } from "../models/requests-models/RequestsModels";
import { GetVideoByURIParamsModel } from "../models/videos-models/GetVideoByURIParamsModel";

export const getVideoController = (
  req: RequestWithParams<GetVideoByURIParamsModel>,
  res: Response<OutputVideoType[]>
) => {
  if (!req.params.id) {
    res.status(HTTP_STATUSES.OK_200).json(db.videos);
    return;
  } else {
    console.log(db.videos);
    const video = db.videos.find((v) => v.id === +req.params.id);
    if (video) {
      res.status(HTTP_STATUSES.OK_200).json(video);
      return;
    } else {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    }
  }
};
