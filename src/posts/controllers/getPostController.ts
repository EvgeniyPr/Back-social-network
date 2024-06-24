import { Response } from "express";
import { RequestWithParams } from "../../models/RequestsModels";
import { GetPostByURIParamsModel } from "../models/GetPostByURIParamsModel";
import { PostOutputModel } from "../models/PostOutputModel";
import { postRepository } from "../postsRepository";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { postsMongoDbRepository } from "../repositories/postsMongoDbRepository";

export const getPostsController = async (
  req: RequestWithParams<GetPostByURIParamsModel>,
  res: Response<PostOutputModelToFront[] | PostOutputModelToFront>
) => {
  if (!req.params.id) {
    const posts = await postsMongoDbRepository.getPosts();
    res.status(HTTP_STATUSES.OK_200).json(posts);
    return;
  } else {
    const blog = await postRepository.getPost(req.params.id);
    if (blog) {
      res.status(HTTP_STATUSES.OK_200).json(blog);
      return;
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
};
