import { Response } from "express";
import { RequestWithBody } from "../../models/RequestsModels";
import { PostInputModel } from "../models/PostInputModel";
import { PostOutputModel } from "../models/PostOutputModel";
import { postRepository } from "../postsRepository";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const createPostsController = async (
  req: RequestWithBody<PostInputModel>,
  res: Response<PostOutputModel>
) => {
  const newPost: any = await postRepository.createPost(req.body);
  res.status(HTTP_STATUSES.CREATED_201).json(newPost);
};
