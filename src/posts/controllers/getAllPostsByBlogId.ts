import { RequestWithParamsAndQuery } from "../../common/models/RequestsModels";
import { GetBlogByURIParamsModel } from "../../blogs/models/GetBlogByURIParamsModel";
import { Response } from "express";
import { PostsOutputModelToFrontWithPagination } from "../models/PostOutputModel";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { QueryModel } from "../../common/models/QueryModels";
import { queryPostsRepository } from "../repositories/queryPostsRepository";

export const getAllPostsByBlogId = async (
  req: RequestWithParamsAndQuery<GetBlogByURIParamsModel, QueryModel>,
  res: Response<PostsOutputModelToFrontWithPagination>
) => {
  const posts = await queryPostsRepository.getPosts(req.params.id, req.query);
  res.status(HTTP_STATUSES.OK_200).json(posts);
};
