import { Response } from "express";
import { RequestWithBody } from "../../models/RequestsModels";
import { PostInputModel } from "../models/PostInputModel";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { APIErrorResult } from "../../models/APIErrorResult";
import { postsMongoDbRepository } from "../repositories/postsMongoDbRepository";
import { PostOutputModelToFront } from "../models/PostOutputModel";

export const createPostsController = async (
  req: RequestWithBody<PostInputModel>,
  res: Response<PostOutputModelToFront | APIErrorResult>
) => {
  const newPost = await postsMongoDbRepository.createPost(req.body);
  res.status(HTTP_STATUSES.CREATED_201).json(newPost);
};
