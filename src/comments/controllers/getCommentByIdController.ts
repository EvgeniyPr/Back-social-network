import { Response } from "express";
import { queryCommentsRepository } from "../repositories/queryCommentsRepository";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { RequestWithParams } from "../../common/models/RequestsModels";
import { GetCommentByURIParamsId } from "../models/GetCommentByURIParamsId";

export const getCommentByIdController = async (
  req: RequestWithParams<GetCommentByURIParamsId>,
  res: Response
) => {
  const comment = await queryCommentsRepository.getComment(
    req.params.commentId
  );
  if (comment) {
    res.status(HTTP_STATUSES.OK_200).json(comment);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  return;
};
