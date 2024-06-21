import { Router } from "express";
import { getPostsController } from "../posts/controllers/getPostController";
import { createPostsController } from "../posts/controllers/createPostsController";
import { deletePostController } from "../posts/controllers/deletePostController";
import { updatePostController } from "../posts/controllers/updatePostController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  postInputValidator,
  postsIdParamsValidator,
} from "../posts/middleware/postsValidationMiddleware";
import { errorCheckMiddleware } from "../middlewares/errorCheckMiddleware";

export const postsRouter = Router();

postsRouter.get("/", getPostsController);
postsRouter.get(
  "/:id",
  postsIdParamsValidator,
  errorCheckMiddleware,
  getPostsController
);
postsRouter.post(
  "/",
  authMiddleware,
  ...postInputValidator,
  createPostsController
);
postsRouter.delete(
  "/:id",
  authMiddleware,
  postsIdParamsValidator,
  errorCheckMiddleware,
  deletePostController
);
postsRouter.put(
  "/:id",
  authMiddleware,
  postsIdParamsValidator,
  ...postInputValidator,
  updatePostController
);
