import { Response } from "express";
import { RequestWithParams } from "../../models/RequestsModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { BlogOutputModelToFront } from "../models/BlogOutputModel";
import { GetBlogByURIParamsModel } from "../models/GetBlogByURIParamsModel";
import { blogsMongoDBRepository } from "../repositories/blogsMongoDbRepository";
import { blogsService } from "../domain/blogsService";

export const getBlogController = async (
  req: RequestWithParams<GetBlogByURIParamsModel>,
  res: Response<BlogOutputModelToFront[] | BlogOutputModelToFront>
) => {
  if (!req.params.id) {
    const blogs = await blogsService.getBlogs();
    if (blogs) {
      res.status(HTTP_STATUSES.OK_200).json(blogs);
      return;
    }
  } else {
    const blog = await blogsService.getBlog(req.params.id);
    if (blog) {
      res.status(HTTP_STATUSES.OK_200).json(blog);
      return;
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
};
