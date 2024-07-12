import { Request, Response } from "express";
import { PostOutputModelToFront } from "../models/PostOutputModel";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { postsService } from "../domain/postsService";

export const getPostsController = async (
  req: Request,
  res: Response<PostOutputModelToFront[] | PostOutputModelToFront>
) => {
  const posts = await postsService.getPosts();
  if (posts) {
    res.status(HTTP_STATUSES.OK_200).json(posts);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
};
