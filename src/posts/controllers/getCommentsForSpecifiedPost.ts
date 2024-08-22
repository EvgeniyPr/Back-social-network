import { Response } from "express";
import { RequestWithParamsAndQuery } from "../../common/models/RequestsModels";
import { queryCommentsRepository } from "../../comments/repositories/queryCommentsRepository";
import { GetPostByURIParamsModel } from "../models/GetPostByURIParamsModel";
import { QueryModel, typeId } from "../../common/models/QueryModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const getCommentsForSpecifiedPostController = async (
  req: RequestWithParamsAndQuery<GetPostByURIParamsModel, QueryModel>,
  res: Response
) => {
  const commentsWithPagination =
    await queryCommentsRepository.getCommentsForSpecifiedPostWithPagination(
      { id: req.params.id, typeId: typeId.postId },
      req.query
    );
  res.status(HTTP_STATUSES.OK_200).json(commentsWithPagination);
  return;
};
