import { Router } from "express";
import { getUsersController } from "../users/controllers/getUsersController";
import { createUserController } from "../users/controllers/createUserdeleteUserController";
import { deleteUserController } from "../users/controllers/deleteUserdeleteUserController";
import { authMiddleware } from "../common/middlewares/authMiddleware";
import {
  userInputValidators,
  usersIdParamsValidator,
} from "../users/middleware/usersValidationMiddleware";
import { errorCheckMiddleware } from "../common/middlewares/errorCheckMiddleware";

export const usersRouter = Router();
usersRouter.get("/", authMiddleware, errorCheckMiddleware, getUsersController);
usersRouter.post(
  "/",
  authMiddleware,
  ...userInputValidators,
  errorCheckMiddleware,
  createUserController
);
usersRouter.delete(
  "/:id",
  authMiddleware,
  usersIdParamsValidator,
  errorCheckMiddleware,
  deleteUserController
);
