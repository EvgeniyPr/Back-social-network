import { Response } from "express";
import { APIErrorResult } from "../../models/APIErrorResult";
import { RequestWithParamsAndBody } from "../../models/RequestsModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { postsService } from "../domain/postsService";
import { GetPostByURIParamsModel } from "../models/GetPostByURIParamsModel";
import { PostInputModelForSpecificBlog } from "../models/PostInputModel";
import { PostOutputModelToFront } from "../models/PostOutputModelToFront";

export const createPostForSpecificBlogContriller = async (
  req: RequestWithParamsAndBody<
    GetPostByURIParamsModel,
    PostInputModelForSpecificBlog
  >,
  res: Response<PostOutputModelToFront | APIErrorResult>
) => {
  const newPost = await postsService.createPostForSpecificBlog(
    req.params.id,
    req.body
  );
  res.status(HTTP_STATUSES.CREATED_201).json(newPost);
};
