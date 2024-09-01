import { Response } from "express";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { UserOutputModelToFront } from "../models/UserModels";
import { queryUsersRepository } from "../repositories/queryUsersRepository";
import { RequestWithQuery } from "../../common/models/RequestsModels";
import { QueryModel } from "../../common/models/QueryModels";
import { IPagination } from "../../common/models/Pagination";

export const getUsersController = async (
  req: RequestWithQuery<QueryModel>,
  res: Response<IPagination<UserOutputModelToFront[]>>
) => {
  const users = await queryUsersRepository.getUsers(req.query);
  res.status(HTTP_STATUSES.OK_200).json(users);
  return;
};
