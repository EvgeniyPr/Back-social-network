import { Response } from "express";
import { RequestWithParams } from "../../models/RequestsModels";
import { GetPostByURIParamsModel } from "../models/GetPostByURIParamsModel";
import { PostOutputModelToFront } from "../models/PostOutputModel";
import { postRepository } from "../repositories/postsRepository";
import { PostOutputModelToFront } from "../models/PostOutputModel";
import { postRepository } from "../repositories/postsRepository";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { postsMongoDbRepository } from "../repositories/postsMongoDbRepository";
import { postsMongoDbRepository } from "../repositories/postsMongoDbRepository";

export const getPostsController = async (
  req: RequestWithParams<GetPostByURIParamsModel>,
  res: Response<PostOutputModelToFront[] | PostOutputModelToFront>
) => {
  if (!req.params.id) {
    const posts = await postsMongoDbRepository.getPosts();
    console.log("posts", posts);

    res.status(HTTP_STATUSES.OK_200).json(posts);
    return;
  } else {
    const post = await postsMongoDbRepository.getPost(req.params.id);
    const post = await postsMongoDbRepository.getPost(req.params.id);
    if (post) {
      res.status(HTTP_STATUSES.OK_200).json(post);
      return;
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
};
