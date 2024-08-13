import { Response } from "express";
import { RequestWithBody } from "../../common/models/RequestsModels";
import { PostInputModel } from "../models/PostInputModel";
import { PostOutputModelToFront } from "../models/PostOutputModel";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { APIErrorResult } from "../../common/models/APIErrorResult";
import { postsService } from "../domain/postsService";

export const createPostsController = async (
  req: RequestWithBody<PostInputModel>,
  res: Response<PostOutputModelToFront | APIErrorResult>
) => {
  const newPost = await postsService.createPost(req.body);
  res.status(HTTP_STATUSES.CREATED_201).json(newPost);
};
