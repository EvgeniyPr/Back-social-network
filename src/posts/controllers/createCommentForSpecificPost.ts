import { Request, Response } from "express";
import { postsService } from "../domain/postsService";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { LoginInputModel } from "../../auth/models/LoginInputModel";
import { RequestWithParamsAndBody } from "../../common/models/RequestsModels";
import { GetCommentByURIParamsId } from "../../comments/models/GetCommentByURIParamsID";
import { CommentInputModel } from "../../comments/models/CommentInputModel";

export const createCommentForSpecificPost = async (
  req: RequestWithParamsAndBody<GetCommentByURIParamsId, CommentInputModel>,
  res: Response
) => {
  if (!(await postsService.postWithIdIsExist(req.params.id))) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  } else {
    //@ts-ignore
    const newComment = await postsService.createComment(req.user, req.body);
    res.status(HTTP_STATUSES.CREATED_201).json(newComment);
    return;
  }
};
