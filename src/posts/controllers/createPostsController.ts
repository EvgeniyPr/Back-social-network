import { Response } from "express";
import { RequestWithBody } from "../../models/RequestsModels";
import { PostInputModel } from "../models/PostInputModel";

import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { postsMongoDbRepository } from "../repositories/postsMongoDbRepository";

import { PostOutputModelToFront } from "../models/PostOutputModelToFront";

export const createPostsController = async (
  req: RequestWithBody<PostInputModel>,
  res: Response<PostOutputModelToFront>
) => {
  const newPost = await postsMongoDbRepository.createPost(req.body);
  res.status(HTTP_STATUSES.CREATED_201).json(newPost);
};
