import { Response } from "express";
import { RequestWithParams } from "../../models/RequestsModels";
import { GetPostByURIParamsModel } from "../models/GetPostByURIParamsModel";
import { PostOutputModel } from "../models/PostOutputModel";
import { postRepository } from "../postsRepository";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const getPostsController = async (
  req: RequestWithParams<GetPostByURIParamsModel>,
  res: Response<PostOutputModel[] | PostOutputModel>
) => {
  if (!req.params.id) {
    const blogs = await postRepository.getPosts();
    res.status(HTTP_STATUSES.OK_200).json(blogs);
    return;
  } else {
    const blog = await postRepository.getPost(req.params.id);
    if (blog) {
      res.status(HTTP_STATUSES.OK_200).json(blog);
      return;
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
};
