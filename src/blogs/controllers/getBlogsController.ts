import { Response } from "express";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { BlogsOutputModelToFrontWithPagination } from "../models/BlogOutputModel";
import { RequestWithQuery } from "../../models/RequestsModels";
import { QueryBlogModel } from "../../queryRepositories/QueryModel";
import { queryBlogsRepository } from "../../queryRepositories/queryBlogsRepository";

export const getBlogsController = async (
  req: RequestWithQuery<QueryBlogModel>,
  res: Response<BlogsOutputModelToFrontWithPagination>
) => {
  const { query } = req;
  const blogs = await queryBlogsRepository.getBlogs(query);
  if (blogs) {
    res.status(HTTP_STATUSES.OK_200).json(blogs);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
