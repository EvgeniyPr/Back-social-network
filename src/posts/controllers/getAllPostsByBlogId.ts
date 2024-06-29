import { RequestWithParams } from "../../models/RequestsModels";
import { GetBlogByURIParamsModel } from "../../blogs/models/GetBlogByURIParamsModel";
import { Response } from "express";
import { PostOutputModelToFront } from "../models/PostOutputModelToFront";
import { postsService } from "../domain/postsService";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const getAllPostsByBlogId = async (
  req: RequestWithParams<GetBlogByURIParamsModel>,
  res: Response<PostOutputModelToFront[]>
) => {
  if (req.params.id) {
    const posts = await postsService.getPosts();
    res.status(HTTP_STATUSES.OK_200).json(posts);
  }
};
