import { Response } from "express";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { UsersOutputModelToFrontWithPagination } from "../models/UserModels";
import { queryUsersRepository } from "../../queryRepositories/queryUsersRepository";
import { RequestWithQuery } from "../../common/models/RequestsModels";
import { QueryModel } from "../../queryRepositories/models/QueryModels";

export const getUsersController = async (
  req: RequestWithQuery<QueryModel>,
  res: Response<UsersOutputModelToFrontWithPagination>
) => {
  const users = await queryUsersRepository.getUsers(req.query);
  res.status(HTTP_STATUSES.OK_200).json(users);
  return;
};
