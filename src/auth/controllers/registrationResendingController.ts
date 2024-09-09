import { Response } from "express";
import { RequestWithBody } from "../../common/models/RequestsModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { RegistrationEmailResending } from "../models/RegistrationEmailResending";
import { authService } from "../domain/authService";

export const registrationResendingController = async (
  req: RequestWithBody<RegistrationEmailResending>,
  res: Response
) => {
  const registrationIsConfirmed =
    await authService.confirmResendingRegistration(req.body.email);
  if (registrationIsConfirmed) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    return;
  }
  res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
};
