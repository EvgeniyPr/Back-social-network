import { Response } from "express";
import { PostOutputModelToFront } from "../models/PostOutputModel";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { RequestWithQuery } from "../../common/models/RequestsModels";
import { QueryModel } from "../../common/models/QueryModels";
import { queryPostsRepository } from "../repositories/queryPostsRepository";
import { IPagination } from "../../common/models/Pagination";

export const getPostsController = async (
  req: RequestWithQuery<QueryModel>,
  res: Response<IPagination<PostOutputModelToFront[]> | PostOutputModelToFront>
) => {
  const { query } = req;
  const posts = await queryPostsRepository.getPosts(null, query);
  if (posts) {
    res.status(HTTP_STATUSES.OK_200).json(posts);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
