import { Router } from "express";
import { authControler } from "../auth/controllers/authController";
import {
  userBodyConfirmationCodeValidator,
  userConfirmationCodeCheckValidator,
  userLoginOrEmailInputValidator,
  userLoginPaswordValidator,
  userResendingRegistrationValidator,
} from "../auth/middleware/authValidationMiddleware";
import { errorCheckMiddleware } from "../common/middlewares/errorCheckMiddleware";
import { getMeController } from "../auth/controllers/getMeController";
import { bearerAuthMiddleware } from "../common/middlewares/bearerAuthMiddleware";
import { registrationController } from "../auth/controllers/registrationController";
import { userInputValidators } from "../users/middleware/usersValidationMiddleware";
import { registrationConfirmationController } from "../auth/controllers/registrationConfirmationController";
import { registrationResendingController } from "../auth/controllers/registrationResendingController";

export const authRouter: Router = Router();
authRouter.post(
  "/login",
  userLoginOrEmailInputValidator,
  userLoginPaswordValidator,
  errorCheckMiddleware,
  authControler
);

authRouter.post(
  "/registration",
  userInputValidators,
  errorCheckMiddleware,
  registrationController
);
authRouter.post(
  "/registration-confirmation",
  userBodyConfirmationCodeValidator,
  userConfirmationCodeCheckValidator,
  errorCheckMiddleware,
  registrationConfirmationController
);
authRouter.post(
  "/registration-email-resending",
  userResendingRegistrationValidator,
  errorCheckMiddleware,
  registrationResendingController
);

authRouter.get("/me", bearerAuthMiddleware, getMeController);
