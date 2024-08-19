import { Request, Response } from "express";
import { queryCommentsRepository } from "../repositories/queryCommentsRepository";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const getCommentByIdController = async (req: Request, res: Response) => {
  const comment = await queryCommentsRepository.getComment(
    req.params.commentsId
  );
  if (comment) {
    res.status(HTTP_STATUSES.OK_200).json(comment);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  return;
};
