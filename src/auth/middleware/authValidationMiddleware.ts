import { body } from "express-validator";

export const userLoginInputValidator = body("loginOrEmail")
  .trim()
  .notEmpty()
  .withMessage("loginOrEmail is empty")
  .isString()
  .withMessage("loginOrEmail must be a string");
