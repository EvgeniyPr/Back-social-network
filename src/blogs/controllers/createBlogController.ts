import { Response } from "express";
import { db } from "../../db/db";
import { RequestWithBody } from "../../models/RequestsModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { APIErrorResult } from "../../videos/models/video-error-models/APIErrorResult";
import { BlogInputModel } from "../models/BlogInputModel";
import { BlogOutputModel } from "../models/BlogOutputModel";
import { createBlog } from "../utils blogs/createBlog";
import { blogsRepository } from "../blogRepository";

export const createBlogController = async (
  req: RequestWithBody<BlogInputModel>,
  res: Response<BlogOutputModel>
) => {
  //middleware validdation 400
  //middleware authorized 401
  const newBlog = await blogsRepository.createBlog(req.body);

  res.status(HTTP_STATUSES.OK_200).json(newBlog);
};
