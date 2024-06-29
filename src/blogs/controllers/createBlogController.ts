import { Response } from "express";
import { RequestWithBody } from "../../models/RequestsModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { BlogInputModel } from "../models/BlogInputModel";
import { BlogOutputModelToFront } from "../models/BlogOutputModel";
import { blogsService } from "../domain/blogsService";

export const createBlogController = async (
  req: RequestWithBody<BlogInputModel>,
  res: Response<BlogOutputModelToFront | null>
) => {
  const newBlog = await blogsService.createBlog(req.body);

  res.status(HTTP_STATUSES.CREATED_201).json(newBlog);
};
