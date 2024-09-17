import { body } from "express-validator";
import { authService } from "../domain/authService";
import { authMongoDbRepository } from "../repositories/authMongoDbRepository";

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

export const userBodyConfirmationCodeValidator = body("code")
  .trim()
  .notEmpty()
  .withMessage("code is empty")
  .isString()
  .withMessage("code must be a string");

export const userConfirmationCodeCheckValidator = body("code").custom(
  async (code) => {
    const user = await authService.userAvailabilityByConfirmationCodeMiddleware(
      code
    );
    if (user.emailConfirmation.isConfirmed) {
      throw new Error("User is already confirmed");
    }
    if (new Date() > user.emailConfirmation.expirationDate) {
      throw new Error("Confirmation code is expired");
    }
  }
);

export const userResendingRegistrationValidator = body("email")
  .trim()
  .notEmpty()
  .withMessage("code is empty")
  .isString()
  .withMessage("code must be a string")
  .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  .withMessage("wrong format email")
  .custom(async (email) => {
    const user = await authMongoDbRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.emailConfirmation.isConfirmed) {
      throw new Error("User is already confirmed");
    }
  });
