import { Router } from "express";
import { getUsersController } from "../users/controllers/getUsersController";
import { createUser } from "../users/controllers/createUser";
import { deleteUser } from "../users/controllers/deleteUser";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  userInputValidators,
  usersIdParamsValidator,
} from "../users/middleware/usersValidationMiddleware";
import { errorCheckMiddleware } from "../middlewares/errorCheckMiddleware";

export const usersRouter = Router();
usersRouter.get("/", authMiddleware, errorCheckMiddleware, getUsersController);
usersRouter.post(
  "/",
  authMiddleware,
  ...userInputValidators,
  errorCheckMiddleware,
  createUser
);
usersRouter.delete(
  "/:id",
  authMiddleware,
  usersIdParamsValidator,
  errorCheckMiddleware,
  deleteUser
);
