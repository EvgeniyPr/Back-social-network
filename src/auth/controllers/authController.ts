import { Response } from "express";
import { RequestWithBody } from "../../common/models/RequestsModels";
import { LoginInputModel } from "../models/LoginInputModel";
import { authService } from "../domain/authService";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { AccessTokenModel } from "../models/AccessTokenModel";

export const authControler = async (
  req: RequestWithBody<LoginInputModel>,
  res: Response
) => {
  const token: AccessTokenModel | false = await authService.guard(req.body);
  if (token) {
    res.status(HTTP_STATUSES.OK_200).json(token);
    return;
  }
  res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
  return;
};
