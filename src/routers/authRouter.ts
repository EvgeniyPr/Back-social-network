import { Router } from "express";
import { authControler } from "../auth/controllers/authController";
import { userPaswordInputValidator } from "../users/middleware/usersValidationMiddleware";
import { userLoginInputValidator } from "../auth/middleware/authValidationMiddleware";
import { errorCheckMiddleware } from "../middlewares/errorCheckMiddleware";

export const authRouter = Router();
authRouter.post(
  "/login",
  userLoginInputValidator,
  userPaswordInputValidator,
  errorCheckMiddleware,
  authControler
);
