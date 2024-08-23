import { body, param } from "express-validator";

export const commentsValidationMiddleware = body("content")
  .notEmpty()
  .withMessage("content is empty")
  .isLength({ min: 20, max: 300 })
  .withMessage("min length of content is 20 and max length is 300");

export const commentsIdParamsValidator = param("commentsId")
  .matches(/^[0-9a-fA-F]{24}$/)
  .withMessage("id must be 24 character hex string");
