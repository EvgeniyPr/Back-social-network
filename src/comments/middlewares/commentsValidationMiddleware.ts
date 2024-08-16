import { body } from "express-validator";

export const commentsValidationMiddleware = body("content")
  .notEmpty()
  .withMessage("websiteUrl is empty")
  .isLength({ min: 20, max: 300 })
  .withMessage("min length of content is 20 and max length is 300");
