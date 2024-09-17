import { Response } from "express";
import { RequestWithBody } from "../../common/models/RequestsModels";
import { ConfirmationInputData } from "../models/ConfirmationInputData";
import { authService } from "../domain/authService";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const registrationConfirmationController = async (
  req: RequestWithBody<ConfirmationInputData>,
  res: Response
) => {
  const result = await authService.confirmRegistration(req.body.code);
  if (result) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  }
  return;
};
