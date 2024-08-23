import { Response } from "express";
import { RequestWithBody } from "../../common/models/RequestsModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { UserInputModel } from "../models/UserInputModel";
import { UserOutputModelToFront } from "../models/UserModels";
import { userService } from "../domain/usersService";

export const createUser = async (
  req: RequestWithBody<UserInputModel>,
  res: Response<UserOutputModelToFront | null>
) => {
  const user = await userService.createUser(req.body);
  res.status(HTTP_STATUSES.CREATED_201).json(user);
  return;
};
