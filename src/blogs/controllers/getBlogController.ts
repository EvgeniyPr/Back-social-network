import { Response } from "express";
import { db } from "../../db/db";
import { RequestWithParams } from "../../models/RequestsModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { BlogOutputModel } from "../models/BlogOutputModel";
import { GetBlogByURIParamsModel } from "../models/GetBlogByURIParamsModel";
import { blogsRepository } from "../blogRepository";

export const getBlogController = async (
  req: RequestWithParams<GetBlogByURIParamsModel>,
  res: Response<BlogOutputModel[] | BlogOutputModel>
) => {
  if (!req.params.id) {
    const blogs = await blogsRepository.getBlogs();
    if (blogs) {
      res.status(HTTP_STATUSES.OK_200).json(blogs);
      return;
    }
  } else {
    const blog = await blogsRepository.getBlog(req.params.id);
    if (blog) {
      res.status(HTTP_STATUSES.OK_200).json(blog);
      return;
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
};
