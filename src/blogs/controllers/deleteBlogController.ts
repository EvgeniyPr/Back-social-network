import { Response } from "express";
import { db } from "../../db/db";
import { RequestWithParams } from "../../models/RequestsModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { findIndex } from "../../utils/findIndex";
import { GetBlogByURIParamsModel } from "../models/GetBlogByURIParamsModel";

export const deleteBlogController = (
  req: RequestWithParams<GetBlogByURIParamsModel>,
  res: Response
) => {
  const indexBlogToDelete = findIndex(req.params.id, db.blogs);
  if (indexBlogToDelete > -1) {
    db.blogs.splice(indexBlogToDelete, 1);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
