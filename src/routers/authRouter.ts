import { Router } from "express";
import { authControler } from "../auth/controllers/authController";
import {
  userLoginOrEmailInputValidator,
  userLoginPaswordValidator,
} from "../auth/middleware/authValidationMiddleware";
import { errorCheckMiddleware } from "../common/middlewares/errorCheckMiddleware";
import { getMeController } from "../auth/controllers/getMeController";
import { bearerAuthMiddleware } from "../common/middlewares/bearerAuthMiddleware";
// import { CustomRequest } from "../common/models/RequestsModels";

export const authRouter: Router = Router();
authRouter.post(
  "/login",
  userLoginOrEmailInputValidator,
  userLoginPaswordValidator,
  errorCheckMiddleware,
  authControler
);
authRouter.get("/me", bearerAuthMiddleware, getMeController);
