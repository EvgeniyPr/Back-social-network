import { Response } from "express";
import { RequestWithBody } from "../../models/RequestsModels";
import { PostInputModel } from "../models/PostInputModel";
import { PostOutputModelToFront } from "../models/PostOutputModelToFront";
import { postRepository } from "../postsRepository";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const createPostsController = async (
  req: RequestWithBody<PostInputModel>,
  res: Response<PostOutputModelToFront>
) => {
  const newPost: any = await postRepository.createPost(req.body);
  res.status(HTTP_STATUSES.CREATED_201).json(newPost);
};
