import { Response } from "express";
import { RequestWithBody } from "../../models/RequestsModels";
import { PostInputModel } from "../models/PostInputModel";
import { PostOutputModelToFront } from "../models/PostOutputModel";
<<<<<<< HEAD

import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
=======
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { postsMongoDbRepository } from "../repositories/postsMongoDbRepository";
>>>>>>> 1008e8d (craete postsMongoDbRepository)
import { APIErrorResult } from "../../models/APIErrorResult";
import { postsMongoDbRepository } from "../repositories/postsMongoDbRepository";

export const createPostsController = async (
  req: RequestWithBody<PostInputModel>,
  res: Response<PostOutputModelToFront | APIErrorResult>
) => {
  const newPost = await postsMongoDbRepository.createPost(req.body);
  res.status(HTTP_STATUSES.CREATED_201).json(newPost);
};
