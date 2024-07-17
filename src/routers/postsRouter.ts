import { Router } from "express";
import { createPostsController } from "../posts/controllers/createPostsController";
import { deletePostController } from "../posts/controllers/deletePostController";
import { updatePostController } from "../posts/controllers/updatePostController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorCheckMiddleware } from "../middlewares/errorCheckMiddleware";
import {
  postInputValidator,
  postsIdParamsValidator,
} from "../posts/middleware/postsValidationMiddleware";
import { getPostsController } from "../posts/controllers/getPostsController";
import { getPostController } from "../posts/controllers/getPostController";

export const postsRouter = Router();
postsRouter.get("/", getPostsController);
postsRouter.get(
  "/:id",
  postsIdParamsValidator,
  errorCheckMiddleware,
  getPostController
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
