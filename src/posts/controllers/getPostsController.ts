import { query, Request, Response } from "express";
import {
  PostOutputModelToFront,
  PostsOutputModelToFrontWithPagination,
} from "../models/PostOutputModel";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { postsService } from "../domain/postsService";
import { RequestWithQuery } from "../../models/RequestsModels";
import { QueryModel } from "../../queryRepositories/models/QueryModels";
import { queryPostsRepository } from "../../queryRepositories/queryPostsRepository";

export const getPostsController = async (
  req: RequestWithQuery<QueryModel>,
  res: Response<PostsOutputModelToFrontWithPagination | PostOutputModelToFront>
) => {
  const { query } = req;
  const posts = await queryPostsRepository.getPosts(null, query);
  if (posts) {
    res.status(HTTP_STATUSES.OK_200).json(posts);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
