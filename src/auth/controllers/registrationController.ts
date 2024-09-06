import { Response } from "express";
import { RequestWithBody } from "../../common/models/RequestsModels";
import { RegistrationInputData } from "../models/RegistrationInputData";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { authService } from "../domain/authService";

export const registrationController = async (
  req: RequestWithBody<RegistrationInputData>,
  res: Response
) => {
  const userIsCreated = await authService.registrateUser(req.body);
  if (userIsCreated) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  }
  res.sendStatus(HTTP_STATUSES.SERVICE_UNAVAILABLE_503);
  return;
};
