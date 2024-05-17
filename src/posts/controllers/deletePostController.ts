import { Response } from "express";
import { RequestWithParams } from "../../models/RequestsModels";
import { GetPostByURIParamsModel } from "../models/GetPostByURIParamsModel";
import { postRepository } from "../postsRepository";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const deletePostController = async (
  req: RequestWithParams<GetPostByURIParamsModel>,
  res: Response
) => {
  const isDeleted = await postRepository.deletePost(req.params.id);
  if (isDeleted) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
