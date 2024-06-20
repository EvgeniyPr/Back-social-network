import { Response } from "express";
import {
  RequestWithBody,
  RequestWithParams,
} from "../../models/RequestsModels";
import { GetPostByURIParamsModel } from "../models/GetPostByURIParamsModel";
import { PostInputModel } from "../models/PostInputModel";
import { postRepository } from "../repositories/postsRepository";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { postsMongoDbRepository } from "../repositories/postsMongoDbRepository";

export const updatePostController = async (
  req: RequestWithParams<GetPostByURIParamsModel> &
    RequestWithBody<PostInputModel>,
  res: Response
) => {
  const isUpdated = await postsMongoDbRepository.updatePost(
    req.params.id,
    req.body
  );
  if (isUpdated) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
