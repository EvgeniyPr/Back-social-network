import { Response } from "express";
import { RequestWithParams } from "../../common/models/RequestsModels";
import { queryCommentsRepository } from "../../comments/repositories/queryCommentsRepository";
import { GetPostByURIParamsModel } from "../models/GetPostByURIParamsModel";

export const getAllCommentsForSpecifiedPostController = (
  req: RequestWithParams<GetPostByURIParamsModel>,
  res: Response
) => {
  const commentsWithPagination =
    queryCommentsRepository.getAllCommentsForSpecifiedPost(req.params.id);
};
