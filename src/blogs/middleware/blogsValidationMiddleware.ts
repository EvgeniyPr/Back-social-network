import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { errors } from "../../errors/errors";
import { mapErrors } from "../../utils/mapErrors";
import { resetErrors } from "../../utils/resetErrors";

export const blogNameInputValidator = body("name")
  .notEmpty()
  .withMessage("name is empty")
  .isString()
  .withMessage("name isn't a string")
  .isLength({ max: 15 })
  .withMessage("max length of name is 15");

export const blogDescriptionInputValidation = body("description")
  .notEmpty()
  .withMessage("description is empty")
  .isString()
  .withMessage("description isn't a string")
  .isLength({ max: 500 })
  .withMessage("max length of description is 500");

export const blogWebsiteUrlInputValidation = body("websiteUrl")
  .notEmpty()
  .withMessage("websiteUrl is empty")
  .isString()
  .withMessage("websiteUrl isn't a string")
  .isLength({ max: 100 })
  .withMessage("max length of websiteUrl is 100");

export const errorCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  resetErrors();
  const result = validationResult(req).array({ onlyFirstError: true });
  if (result.length > 0) {
    mapErrors(result);
    res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors);
    return;
  }
  next();
};

export const blogsInputValidators = [
  blogNameInputValidator,
  blogDescriptionInputValidation,
  blogWebsiteUrlInputValidation,
  errorCheckMiddleware,
];
