import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { usersMongoDbRepository } from "../repositories/usersMongoDbRepository";
import { RequestWithParams } from "../../models/RequestsModels";
import { GetUserByUriParam } from "../models/GetUserByUriParam";
import { userService } from "../domain/usersService";

export const deleteUser = async (
  req: RequestWithParams<GetUserByUriParam>,
  res: Response
) => {
  const responce = await userService.deleteUser(req.params.id);
  if (responce) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
  return;
};
