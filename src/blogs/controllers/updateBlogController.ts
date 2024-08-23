import { Response } from "express";
import {
  RequestWithBody,
  RequestWithParams,
} from "../../common/models/RequestsModels";
import { BlogInputModel } from "../models/BlogInputModel";
import { GetBlogByURIParamsModel } from "../models/GetBlogByURIParamsModel";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { blogsMongoDBRepository } from "../repositories/blogsMongoDbRepository";
import { blogsService } from "../domain/blogsService";

export const updateBlogController = async (
  req: RequestWithParams<GetBlogByURIParamsModel> &
    RequestWithBody<BlogInputModel>,
  res: Response
) => {
  const isUpdated = await blogsService.updateBlog(req.params.id, req.body);
  if (isUpdated) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
