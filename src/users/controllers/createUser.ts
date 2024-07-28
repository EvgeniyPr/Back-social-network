import { Response } from "express";
import { RequestWithBody } from "../../models/RequestsModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { usersMongoDbRepository } from "../repositories/usersMongoDbRepository";
import { UserInputModel } from "../models/UserInputModel";
import { UserViewModel } from "../models/UserViewModel";

export const createUser = async (
  req: RequestWithBody<UserInputModel>,
  res: Response<UserViewModel | null>
) => {
  const user = await usersMongoDbRepository.createUser(req.body);

  res.status(HTTP_STATUSES.CREATED_201).json(user);

  return;
};
