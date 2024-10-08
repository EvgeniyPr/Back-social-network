import { Request, Response } from "express";
import { commentsService } from "../domain/commentsService";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { RequestWithParams } from "../../common/models/RequestsModels";
import { GetCommentByURIParamsId } from "../models/GetCommentByURIParamsId";

export const deleteCommentController = async (
  req: RequestWithParams<GetCommentByURIParamsId>,
  res: Response
) => {
  const responce = await commentsService.deleteComment(
    req.params.commentId,
    req.user!
  );
  if (!responce) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
  if (responce === 1) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  }
  if (responce === "FORBIDDEN_403") {
    res.sendStatus(HTTP_STATUSES.FORBIDDEN_403);
  }
  return;
};
