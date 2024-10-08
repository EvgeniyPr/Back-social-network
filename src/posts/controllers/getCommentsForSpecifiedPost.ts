import { Response } from "express";
import { RequestWithParamsAndQuery } from "../../common/models/RequestsModels";
import { queryCommentsRepository } from "../../comments/repositories/queryCommentsRepository";
import { GetPostByURIParamsModel } from "../models/GetPostByURIParamsModel";
import { QueryModel } from "../../common/models/QueryModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { IPagination, typeId } from "../../common/models/Pagination";
import { CommentOutputModelToFront } from "../../comments/models/CommenOutputModel";

export const getCommentsForSpecifiedPostController = async (
  req: RequestWithParamsAndQuery<GetPostByURIParamsModel, QueryModel>,
  res: Response<IPagination<CommentOutputModelToFront[]>>
) => {
  const commentsWithPagination =
    await queryCommentsRepository.getCommentsForSpecifiedPostWithPagination(
      { id: req.params.id, typeId: typeId.postId },
      req.query
    );
  res.status(HTTP_STATUSES.OK_200).json(commentsWithPagination);
  return;
};
