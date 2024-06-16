import { Response } from "express";
import { RequestWithParams } from "../../models/RequestsModels";
import { GetPostByURIParamsModel } from "../models/GetPostByURIParamsModel";
import { PostOutputModelToFront } from "../models/PostOutputModelToFrontToFront";
import { postRepository } from "../postsRepository";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const getPostsController = async (
  req: RequestWithParams<GetPostByURIParamsModel>,
  res: Response<PostOutputModelToFront[] | PostOutputModelToFront>
) => {
  if (!req.params.id) {
    // const postsDb = await postRepository.getPostsFromDB();
    const posts = await postRepository.getPosts();
    res.status(HTTP_STATUSES.OK_200).json(posts);
    return;
  } else {
    const post = await postRepository.getPost(req.params.id);
    if (post) {
      res.status(HTTP_STATUSES.OK_200).json(post);
      return;
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
};
