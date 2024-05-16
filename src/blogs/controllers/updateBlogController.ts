import { Response } from "express";
import {
  RequestWithBody,
  RequestWithParams,
} from "../../models/RequestsModels";
import { BlogInputModel } from "../models/BlogInputModel";
import { GetBlogByURIParamsModel } from "../models/GetBlogByURIParamsModel";
import { findIndex } from "../../utils/findIndex";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const updateBlogController = (
  req: RequestWithParams<GetBlogByURIParamsModel> &
    RequestWithBody<BlogInputModel>,
  res: Response
) => {
  //validation middleware first
  const indexBlogToUpdate = findIndex(req.params.id, db.blogs);
  if (indexBlogToUpdate > -1) {
    db.blogs[indexBlogToUpdate] = {
      ...db.blogs[indexBlogToUpdate],
      ...req.body,
    };
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
};
