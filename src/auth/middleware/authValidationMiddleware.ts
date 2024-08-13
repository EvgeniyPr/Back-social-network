import { body } from "express-validator";

export const userLoginOrEmailInputValidator = body("loginOrEmail")
  .trim()
  .notEmpty()
  .withMessage("loginOrEmail is empty")
  .isString()
  .withMessage("loginOrEmail must be a string");

export const userLoginPaswordValidator = body("password")
  .trim()
  .notEmpty()
  .withMessage("password is empty")
  .isString()
  .withMessage("password must be a string");
