import { validationResult } from "express-validator";
import { mapErrors } from "../utils/mapErrors";
import { HTTP_STATUSES } from "../settings/HTTP_STATUSES/HTTP_STATUSES";
import { Request, Response, NextFunction } from "express";
import { APIErrorResult } from "../models/APIErrorResult";
export let errors: APIErrorResult;
export const errorCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationErrors = validationResult(req).array({
    onlyFirstError: true,
  });
  if (validationErrors.length > 0) {
    errors = mapErrors(validationErrors);
    res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors);
    return;
  }
  next();
};
