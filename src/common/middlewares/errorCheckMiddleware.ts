import { validationResult } from "express-validator";
import { mapErrors } from "../errors/mapErrors";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
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
    if (
      errors.errorsMessages.some(
        (error) =>
          (error.message === "There are no blogs with such id" ||
            error.message === "There are no posts with such id") &&
          error.field === "id"
      )
    ) {
      res.status(HTTP_STATUSES.NOT_FOUND_404).json(errors);
      return;
    } else {
      res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors);
      return;
    }
  }
  next();
};
