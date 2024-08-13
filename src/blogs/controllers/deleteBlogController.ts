import { Response } from "express";
import { RequestWithParams } from "../../common/models/RequestsModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { GetBlogByURIParamsModel } from "../models/GetBlogByURIParamsModel";
import { blogsService } from "../domain/blogsService";

export const deleteBlogController = async (
  req: RequestWithParams<GetBlogByURIParamsModel>,
  res: Response
) => {
  const isDeleted = await blogsService.deleteBlog(req.params.id);
  if (isDeleted) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
