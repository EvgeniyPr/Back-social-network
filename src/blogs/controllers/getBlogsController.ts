import { Response } from "express";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { BlogOutputModelToFront } from "../models/BlogOutputModel";
import { RequestWithQuery } from "../../common/models/RequestsModels";
import { QueryModel } from "../../common/models/QueryModels";
import { queryBlogsRepository } from "../repositories/queryBlogsRepository";
import { IPagination } from "../../common/models/Pagination";

export const getBlogsController = async (
  req: RequestWithQuery<QueryModel>,
  res: Response<IPagination<BlogOutputModelToFront[]>>
) => {
  const blogs = await queryBlogsRepository.getBlogs(req.query);
  if (blogs) {
    res.status(HTTP_STATUSES.OK_200).json(blogs);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
