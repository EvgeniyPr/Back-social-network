import { body, param } from "express-validator";
import { userService } from "../domain/usersService";

const userLoginInputValidator = body("login")
  .trim()
  .notEmpty()
  .withMessage("login is empty")
  .isString()
  .withMessage("login must be a string")
  .isLength({ min: 3, max: 10 })
  .withMessage("min length is 3, max length is 10")
  .matches(/^[a-zA-Z0-9_-]*$/)
  .withMessage("characters must be numbers or lowercase or uppercase letters")
  .custom(async (login) => {
    await userService.loginAndMailAreUnique(login);
  });

export const usersIdParamsValidator = param("id")
  .matches(/^[0-9a-fA-F]{24}$/)
  .withMessage("id must be 24 character hex string");

export const userPaswordInputValidator = body("password")
  .trim()
  .notEmpty()
  .withMessage("password is empty")
  .isString()
  .withMessage("password must be a string")
  .isLength({ min: 6, max: 20 })
  .withMessage("min length is 6, max length is 20");

const userEmailInputValidator = body("email")
  .trim()
  .notEmpty()
  .withMessage("email is empty")
  .isString()
  .withMessage("email must be a string")
  .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  .withMessage("wrong format email")
  .custom(async (email) => {
    await userService.loginAndMailAreUnique(email);
  });

export const userInputValidators = [
  userLoginInputValidator,
  userPaswordInputValidator,
  userEmailInputValidator,
];
