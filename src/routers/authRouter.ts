import { Router } from "express";
import { authControler } from "../auth/controllers/authController";
import {
  userLoginOrEmailInputValidator,
  userLoginPaswordValidator,
} from "../auth/middleware/authValidationMiddleware";
import { errorCheckMiddleware } from "../common/middlewares/errorCheckMiddleware";

export const authRouter = Router();
authRouter.post(
  "/login",
  userLoginOrEmailInputValidator,
  userLoginPaswordValidator,
  errorCheckMiddleware,
  authControler
);
