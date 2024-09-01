import { Response } from "express";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { CommentOutputModelToFront } from "../../comments/models/CommenOutputModel";
import { commentsService } from "../../comments/domain/commentsService";
import { CommentInputModel } from "../../comments/models/CommentInputModel";
import { RequestWithParamsAndBody } from "../../common/models/RequestsModels";
import { GetPostByURIParamsModel } from "../models/GetPostByURIParamsModel";
export const createCommentForSpecificPost = async (
  req: RequestWithParamsAndBody<GetPostByURIParamsModel, CommentInputModel>,
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
