import { Router } from "express";
import { getAllUsersController } from "../users/controllers/getAllUsersController";
import { createUser } from "../users/controllers/createUser";
import { deleteUser } from "../users/controllers/deleteUser";

export const usersRouter = Router();
usersRouter.get("/", getAllUsersController);
usersRouter.post("/", createUser);
usersRouter.delete("/:id", deleteUser);
