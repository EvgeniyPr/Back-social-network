import { Response } from "express";
import { RequestWithParams } from "../../common/models/RequestsModels";
import { GetPostByURIParamsModel } from "../models/GetPostByURIParamsModel";
import { PostOutputModelToFront } from "../models/PostOutputModel";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { postsService } from "../domain/postsService";
import { queryPostsRepository } from "../../queryRepositories/queryPostsRepository";

export const getPostController = async (
  req: RequestWithParams<GetPostByURIParamsModel>,
  res: Response<PostOutputModelToFront[] | PostOutputModelToFront>
) => {
  const post = await queryPostsRepository.getPost(req.params.id);
  if (post) {
    res.status(HTTP_STATUSES.OK_200).json(post);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
