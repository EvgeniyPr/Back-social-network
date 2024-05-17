import { Response } from "express";
import { db } from "../../db/db";
import { RequestWithParams } from "../../models/RequestsModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { findIndex } from "../../utils/findIndex";
import { GetBlogByURIParamsModel } from "../models/GetBlogByURIParamsModel";
import { blogsRepository } from "../blogRepository";

export const deleteBlogController = async (
  req: RequestWithParams<GetBlogByURIParamsModel>,
  res: Response
) => {
  const isDeleted = await blogsRepository.deleteBlog(req.params.id);
  if (isDeleted) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
