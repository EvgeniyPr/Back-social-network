import { Request, Response } from "express";
import { postsService } from "../domain/postsService";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { CommentOutputModelToFront } from "../../comments/models/CommenViewModel";
import { commentsService } from "../../comments/domain/commentsService";
export const createCommentForSpecificPost = async (
  req: Request,
  res: Response<CommentOutputModelToFront>
) => {
  const newComment = await commentsService.createComment(
    req.user!,
    req.body,
    req.params.id
  );
  res.status(HTTP_STATUSES.CREATED_201).json(newComment);
  return;
};
