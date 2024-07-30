import { RequestWithParamsAndQuery } from "../../models/RequestsModels";
import { GetBlogByURIParamsModel } from "../../blogs/models/GetBlogByURIParamsModel";
import { Response } from "express";
import { PostsOutputModelToFrontWithPagination } from "../models/PostOutputModel";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { QueryModel } from "../../queryRepositories/models/QueryModels";
import { queryPostsRepository } from "../../queryRepositories/queryPostsRepository";

export const getAllPostsByBlogId = async (
  req: RequestWithParamsAndQuery<GetBlogByURIParamsModel, QueryModel>,
  res: Response<PostsOutputModelToFrontWithPagination>
) => {
  const posts = await queryPostsRepository.getPosts(req.params.id, req.query);
  res.status(HTTP_STATUSES.OK_200).json(posts);
};
