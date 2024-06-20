import { Response } from "express";
import { RequestWithBody } from "../../models/RequestsModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { BlogInputModel } from "../models/BlogInputModel";
import { BlogOutputModelToFront } from "../models/BlogOutputModel";
import { blogsRepository } from "../repositories/blogsRepository";
import { blogsMongoDBRepository } from "../repositories/blogsMongoDbRepository";

export const createBlogController = async (
  req: RequestWithBody<BlogInputModel>,
  res: Response<BlogOutputModelToFront | null>
) => {
  const newBlog = await blogsMongoDBRepository.createBlog(req.body);

  res.status(HTTP_STATUSES.CREATED_201).json(newBlog);
};
