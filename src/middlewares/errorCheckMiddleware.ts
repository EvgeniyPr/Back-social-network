import { validationResult } from "express-validator";
import { resetErrors } from "../utils/resetErrors";
import { mapErrors } from "../utils/mapErrors";
import { HTTP_STATUSES } from "../settings/HTTP_STATUSES/HTTP_STATUSES";
import { errors } from "../errors/errors";
import { Request, Response, NextFunction } from "express";

export const errorCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  resetErrors();
  const validationErrors = validationResult(req).array({
    onlyFirstError: true,
  });
  if (validationErrors.length > 0) {
    mapErrors(validationErrors);
    res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors);
    return;
    ``;
  }
  next();
};
