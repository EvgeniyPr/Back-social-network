import { Request, Response } from "express";
import { commentsService } from "../domain/commentsService";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const updateCommentController = async (req: Request, res: Response) => {
  const responce = await commentsService.updateComment(
    req.params.commentId,
    req.body,
    req.user!
  );
  if (!responce) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  if (responce === "FORBIDDEN_403") {
    res.sendStatus(HTTP_STATUSES.FORBIDDEN_403);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  return;
};
