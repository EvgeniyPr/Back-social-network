import { Request, Response } from "express";
import { RequestWithBody } from "../../models/RequestsModels";
import { LoginInputModel } from "../models/LoginInputModel";
import { authService } from "../domain/authService";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const authControler = async (
  req: RequestWithBody<LoginInputModel>,
  res: Response
) => {
  const authenticationResult = await authService.checkLoginAndPassword(
    req.body
  );
  if (authenticationResult) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  }
  res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
  return;
};
